---
title: Building a 32 bit x86 Bootloader
date: 2023-04-03
categories: [Computer Science, Operating Systems]
tags: [bootloader]
---

# Introduction
I'll build a bootloader from scratch for an Intel x86 32-bit processor in this post. You should have some assembly experience before embarking on your bootloader journey. 

## Notes
- Throughout this tutorial, I'll point you in the right direction for the two intel manuals I've been learning from ([^fn1] and [^fn2]) using the following syntax (section a.b.c [^fn1]). These are not comprehensive sections, but they are an excellent place to start looking. As always, the source of truth for this information is not some internet blog written by an amateur software engineer; it's the intel manuals. However, it is understandable not to want to read each one of their ~500-page manuals thoroughly. Start getting comfortable using them as a last resort if anything on the internet needs to be fully spelled out (I promise my tutorial will have flaws).

- When I say "Byte 0, 1, 2..." I am assuming bytes start at zero. So "Byte 0" is equivalent to "The first byte ."Another example, "Byte 511," is the 512th byte. 

## What are the responsibilities of the bootloader?

All the bootloader does is begin executing after being loaded by BIOS, so you can do whatever you want in a bootloader. Technically, there's no such thing as a defined set of tasks that a bootloader must complete. So once BIOS has handed control off to the bootloader, you have free reign to do whatever you want as an OS developer. However, conceptually, the bootloader traditionally does three main things:

1. It loads whatever code runs _after_ the bootloader (usually the operating system kernel) into memory. We'll do this by loading the first Sector of our booting disk into memory (because our kernel is so tiny in this tutorial) using the _real mode_ interrupt [0x13, ah=0x02](https://en.wikipedia.org/wiki/INT_13H#INT_13h_AH=02h:_Read_Sectors_From_Drive).

2. General system initialization (initializing the GDT (section 3.4.5[^fn2]), stack, segmentation (section 3.3[^fn2]), etc.) that you don't want to do in the kernel. This tutorial initializes the GDT by defining a global **code** and **data** section. We'll also set up the stack and assume the flat memory model without paging (section 3.2.2[^fn2]). It's my goal to implement paging soon, and I'll update this tutorial once I've set up paging.

4.  Switching from [16 bit real mode](https://en.wikipedia.org/wiki/Real_mode) to [32 bit protected mode](https://en.wikipedia.org/wiki/Protected_mode) (section 9.9.1[^fn2]). This step is powerful because it disables all bios interrupts and lets us use all 32 bits and segmentation set up from our GDT. Without protected mode, we can only access 16 bits of address space, or `64 KiB` (pretty bad). 

5. Jumping to the location of the desired code (usually the kernel). In this tutorial, we'll write a _very_ simple kernel and store it directly after the bootloader in both memory and disk. 

## Step 1: Getting BIOS to Recognize our Bootloader
Our storage device (flash drive, floppy disk, etc.) stores the bootloader on Sector 1 (512 bytes). BIOS recognizes bootloaders by the magic bytes `0xaa55` in bytes 510 and 511. Let's write an assembly program with `0xaa55` in bytes 510 and 511.

First, let's define the word `0xaa55`:
```
dw 0xaa55
```

We need to place this word on byte 510. We can do that by writing 510 bytes, then executing our command:
```
times 510 db 0
dw 0xaa55
```

But now what happens? When we boot, there's no actual code to run! So let's add an infinite loop. In assembly, an infinite loop looks like this:
```
lbl:
  jmp lbl
```
Which can be shortened to:
```
jmp $
```
(i.e., jump to my current memory address). All together:
```
jmp $
times 510 db 0
dw 0xaa55
```

Now wait a second; we've just written an instruction, followed by writing 510 bytes. In Von Neumann's Architecture, data and code are technically the same thing. So our instructions take up space in our program. The above code looks like this in memory `feeb000000...aa55` (where there are 1020 0's after `feeb`. That makes 514 bytes! (510 bytes of 0's + 2 bytes of `feeb` + 2 bytes of `aa55` = 514) See for yourself: compile this program:
```bash
$ nasm boot.asm
$ stat boot
  File: boot
  Size: 514       	Blocks: 8          IO Block: 4096   regular file
...
```
To fix this, we'll write `510 - number of written bytes`:
```
jmp $
times 510 ($-$$) db 0
dw 0xaa55
```

Compile this file using nasm:
```bash
$ nasm boot.asm
```

And run it using qemu:
```bash
$ qemu-system-i386 boot
```
Nothing should happen, but importantly, you won't crash Qemu. Try changing `510` to `511` and see what happens. 

One last thing. To do anything meaningful, we need to reference the address starting at 0x7c00 because that's where BIOS loads our program into memory. To do this, you can add the following to your bootloader:

```
[org 0x7c00]
jmp $
times 510 ($-$$) db 0
dw 0xaa55
```

## Loading our Code from Disk
Remember that only 512 bytes of our bootloader are loaded. Let's write a simple "kernel" after our program that prints the character 'Q' in real mode and jumps to 0x7e00 (0x7c00 + 512 bytes) - i.e., the code after our bootloader:
```
jmp 0x7e00
times 510 - ($-$$) db 0
dw 0xaa55

mov al, 'Q'
call printCharacter
jmp $

printCharacter:
    mov ah, 0x0e ; (teletype output)
    int 0x10
    ret
```

If we compile and run this, nothing happens. That's because all the code after `dw 0xaa55` is on disk, not in memory. We need to load our disk into memory using int 0x13 to fix this. We want to read cylinder (ch) 0, head (DH) 0, and Sector (cl) 2. _Sector starts at 1_, and our bootloader was on sector 1, so our "kernel" is on sector 2:

```
mov cl, 2
mov dh, 0
mov ch, 0
```

To simplify things, we can load 0 into es (the base of our segment) and 0x7e00 into bx:
```
mov ax, 0
mov es, ax
mov bx, 0x7e00
```

We'll set `ah` to 2 to indicate a read of the disk:
```
mov ah, 0x02
```

And indicate that we want to read one drive (al):
```
mov al, 1
```

(Note: be careful about loading ah and al; they're part of the same 16-bit register ax).

Lastly, we need to know the drive number. I always imagine that the Bootloader had to call int 0x13 at least once to load our bootloader, so it already did the work of loading the drive number into dl. We don't actually have a deterministic way of finding out dl. So instead, I like to store dl in memory immediately at the start of booting, then reference that section later in my code:

```
[org 0x7c00]
mov [DRIVE_NUMBER], dl

... other code
mov dl, [DRIVE_NUMBER]
... other code

DRIVE_NUMBER:
   db 0
```

And finally, we call interrupt 0x13:
```
int 0x14
```

Putting it all together:

```
[org 0x7c00]
mov [DRIVE_NUMBER], dl 

call loadSector
jmp 0x7e00

loadSector:
    ; load 1st sector into address 0x7e00
    mov ax, 0
    mov es, ax              
    mov bx, 0x7e00 
    mov ah, 0x02

    ; Cylinder (0), head (0), Sector (2)
    mov cl, 2
    mov dh, 0
    mov ch, 0

    ; Read one Sector
    mov al, 1
    mov dl, [DRIVE_NUMBER]
    
    int 0x13
    ret


DRIVE_NUMBER:
    db 0

times 510 - ($-$$) db 0
dw 0xaa55

mov al, 'Q'
call printCharacter 
jmp $

printCharacter:
    mov ah, 0x0e ; Teletype output: http://www.ctyme.com/intr/rb-0106.htm
    int 0x10     ; call interrupt
    ret
```

Try rerunning it, and you'll see, as expected, our "kernel code" print a Q to the screen, then infinitely loop.

## Set up the GDT
In this section, we'll define our get in a separate file called `gdt.asm`. Let's label our gdt and two sections:

```
_gdt_start:
   _gdt_null:
      times 8 db 0
   _gdt_code_descriptor
	   ; TODO
   _gdt_data_descriptor
	   ; TODO
gdt_end:
```

Next, let's define what our `gdt` register (`gdtr`) should look like:
```
gdtr:
	dw _gdt_end - _gdt_start - 1
	dd _gdt_start
```

And define the prefix to segmented (long) jumps:
```
code_seg equ _gdt_code_descriptor - _gdt_start
data_seg equ _gdt_data_descriptor - _gdt_start
```

From (section 3.4.5[^fn2]), we know bits 0-15 consist of the first 16 bits of the segment limit. We want all 4 gigabytes, so our segment limit should be (11111... x20) = 0xfffff (5 f's). However, the processor puts this value and the later 1/2 byte value of the limit together with this one, so this first 16 bits is only 2 bytes (0xffff) to be combined with (0xf) later on in the gdt:
```
_gdt_code_descriptor:
    dw 0xffff
```

The following bits (16-31) are the first (of three) parts of the base address, which we will call 0:
```
DW 0x0000
```

At byte offset 4, bits 0-7, the second half of the base is defined:
```
db 0x00
```

Bits 15-12 (decreasing) of byte offset 4 are tricky. They consist of (s, dpl, and p):

- p = 1: indicates that this is  a valid segment (if 0, an exception will be thrown)
- dpl = 00: permission level 0 (most privileged)
- s = 1: Code segment

Bits 11-8 are the type bits:

- e = 1: Indicates that this is an executable segment
- dc = 0: Grows upwards
- rw = 1: Readable
- a = 0: Access bit - keep it 0; the system will set this bit to 1 when this segment is being accessed.

```
db 0b10011010
```

Next, bits 23-20 define (avl, l, d/b and g):

- g = 1: This segment uses 4 KByte increments
- d/b = 1: 32 Bit protected code segment (instead of 16)
- l = 0: Long mode flag - I was told that this should be 1 if d/b is not 0
- avl = 0: Just used by the processor

Bits 19-16 represent the second part of the segment limit (0xf)
```
db 0b11001111
```

Finally, the third half of the base offset:
```
db 0x00
```

Using the flat memory model, we'll let both the code and data segment take up the same memory space. The data segment has a similar derivation to the code descriptor, with minor differences.

Putting everything together:
```
; GDT describes segments (currently code and data) and their permissions (you can't execute the
; data segment silly)

; References:
; Chapter 3.4.5 (https://www.intel.com/content/www/us/en/content-details/774490/intel-64-and-ia-32-architectures-software-developer-s-manual-volume-3a-system-programming-guide-part-1.html?wapkw=segment%20descriptor)
; And [OSDev wiki](https://wiki.osdev.org/Global_Descriptor_Table)
_gdt_start:
    _gdt_null:
        times 8 db 0 

    ; Segment descriptor - has a complex structure. 
    ; See [Segment Descriptor](https://wiki.osdev.org/Global_Descriptor_Table)
    _gdt_code_descriptor:
        dw 0xffff
        DW 0x0000
        db 0x00
        db 0b10011010
        db 0b11001111
        db 0x00

    _gdt_data_descriptor:
        dw 0xffff
        DW 0x0000
        db 0x00
        db 0b10010010
        db 0b11001111
        db 0x00

_gdt_end:


gdtr:
    dw _gdt_end - _gdt_start - 1
    dd _gdt_start


code_seg equ _gdt_code_descriptor - _gdt_start
data_seg equ _gdt_data_descriptor - _gdt_start

```

We'll load the gdt in the next section

## Entering Protected Mode
In protected mode, we'll do a couple of things.
1. Clear the screen. Here's a utility function to do that:
```
_clear_screen:
    mov ah, 0x00
    mov al, 0x03
    int 0x10
    ret
```
2. disable interrupts
```
cli
```

3. Load the gdtr that we defined previously
```
%include "gdt.asm"

lgdt [gdtr]
```
4. Enter protected mode by or-ing cr0 with 0x01:
```
mov eax, cr0
or eax, 0x1
mov cr0, eax
```

We are now in 32-bit protected mode. Let's set up the stack by executing a **far jump** using the gdt we defined (to the code segment):

```
jmp code_seg:_setup

[bits 32]
_setup:
  ...
```

To set up the stack, we'll set all the stack registers to the data segment:
```
mov ax, data_seg
mov ds, ax
mov ss, ax
mov es, ax
mov fs, ax
mov gs, ax
```

And set the stack starting at address 0x90000:

```
; set up the stack base and pointer
mov ebp, 0x90000
mov esp, ebp
```

Finally, we can jump to our kernel!

```
jmp 0x7e00
```

## Wrapping it All Together
In protected mode, we can call int 0x10 to print a character. We need to set the vga to our character explicitly. Putting everything together:

`boot.asm`:
```
[org 0x7c00]
mov [DRIVE_NUMBER], dl 

call loadSectors
jmp protected_mode_setup

loadSectors:
    ; load sector into address 0x7e00
    mov ax, 0
    mov es, ax              
    mov bx, 0x7e00 
    mov ah, 0x02

    ; Cylinder (0), head (0), Sector (2)
    mov cl, 2
    mov dh, 0
    mov ch, 0

    ; Read one Sector
    mov al, 1
    mov dl, [DRIVE_NUMBER]
    
    int 0x13
    ret

%include"protected_mode.asm"

DRIVE_NUMBER:
    db 0

times 510 - ($-$$) db 0
dw 0xaa55

mov al, 'Q'
mov ah, 0x0f
mov [0xb8000], ax
jmp $
```

`protected_mode.asm`:
```
_clear_screen:
    mov ah, 0x00
    mov al, 0x03
    int 0x10
    ret

%include "gdt.asm"

protected_mode_setup:
    call _clear_screen
    cli                     ; 1. disable interrupts

    lgdt [gdtr]             ; 2. load GDT descriptor

    ; Set protection enable bit in cr0 (control register 0)
    ; (you can't just move 1 into cr0, so use a general purpose extended (32-bit) register)
    ; TODO For paging, set bit 31 I think 
    mov eax, cr0
    or eax, 0x1            
    mov cr0, eax
    ; We are now in 32-bit protected mode

    ; Far Jump to the code segment. 
    ; I got confused on this line of code from the OSDevWiki
    ; A far jump takes the form:
    ; jmp <gdt descriptor>:offset
    ; Where the get descriptor is the offset from the get root. For example
    ; the first gdt descriptor would be 0x8 (because null entry)
    ;
    ; I couldn't find the official docs for this, though (TODO)
    jmp code_seg:_protected_mode

[bits 32]
_protected_mode:
    ; Set up the stack and data segments
    mov ax, data_seg
    mov ds, ax
    mov ss, ax
    mov es, ax
    mov fs, ax
    mov gs, ax

    ; Set up the stack base and pointer
    mov ebp, 0x90000
    mov esp, ebp

    ; Transfer control to the kernel :)
    jmp 0x7e00 
```

`gdt.asm`:
```
; GDT describes segments (currently code and data) and their permissions (you can't execute the
; data segment silly)

; References:
; Chapter 3.4.5 (https://www.intel.com/content/www/us/en/content-details/774490/intel-64-and-ia-32-architectures-software-developer-s-manual-volume-3a-system-programming-guide-part-1.html?wapkw=segment%20descriptor)
; And [OSDev wiki](https://wiki.osdev.org/Global_Descriptor_Table)
_gdt_start:
    _gdt_null:
        times 8 db 0 

    ; Segment descriptor - has a complex structure. 
    ; See [Segment Descriptor](https://wiki.osdev.org/Global_Descriptor_Table)
    _gdt_code_descriptor:
        ; byte offset 0

        ; bits 0-15: First 16 bits of segment limit
        ; We want all 4 gigabytes, so our segment limit should
        ; be (111111... x20) = 0xfffff (5 f's)
        ; However, the processor puts this value and the later 1/2 byte value of the limit
        ; together with this one, so this one is only 2 bytes (0xffff) to be combined with
        ; (0xf) later on in the gdt
        dw 0xffff
        
        ; bits 16-31 The first (of three) part of the base address (to be concatenated with
        ; the later fields
        DW 0x0000

        ; byte offset 4
        ; bits 0-7: The second half of the base
        db 0x00

        ; bits 15-12 (s, dpl, p)
        ; p = 1 -> indicates that this is a valid segment (if 0, an exception will be thrown)
        ; dpl = 00 -> Permission level 0 (most privileged) Might change this, not sure
        ; s = 1 -> Code or data segment (as opposed to a system segment)

        ; bits 11-8 (Type): 
        ; e = 1 -> Indicates this is an executable segment
        ; dc = 0 -> Indicates that this segment grows upwards
        ; rw = 1 -> Readable
        ; a = 0 -> Access bit: Keep this 0; system sets it to 1 when being accessed
        db 0b10011010

        ; bits 23-20 (avl, l, d/b, g)
        ; g = 1 -> indicates that segment uses 4 KByte increments (ranges from 4KB to 4 GB) 
        ; d/b = 1 -> Indicates 32-bit protected code segment (as opposed to 16)
        ; l = 0 -> Long mode flag; I was told this should be 1 if d/b is not 0
        ; avl = 0 (just used by the processor - no reason it's 0)
        
        ; bits 19-16 Segment limit pt 2 = 0xf (1111)
        db 0b11001111
        
        ; bits : Third half of the base offset
        db 0x00

    _gdt_data_descriptor:
        dw 0xffff
        DW 0x0000
        db 0x00
        db 0b10010010
        db 0b11001111
        db 0x00

_gdt_end:


gdtr:
    dw _gdt_end - _gdt_start - 1
    dd _gdt_start


code_seg equ _gdt_code_descriptor - _gdt_start
data_seg equ _gdt_data_descriptor - _gdt_start
```



## Appendix 
### CPU architecture jargon words
[Here's an excellent summary of intel cpu architecture](https://www.intel.com/content/www/us/en/architecture-and-technology/64-ia-32-architectures-software-developer-vol-1-manual.html) (**chapter 2.1**). Although, often in the intel software development manuals, you can't just search for jargon terms, so the list below is a bit of a cross-reference for each jargon-y word and a word you can search for in the intel manual:

[Here's another nice explanation of i related jargon](https://myonlineusb.wordpress.com/2011/06/08/what-is-the-difference-between-i386-i486-i586-i686-i786/)

TLDR, intel's names make no sense :). These words are frequently misused / loaded, and it's just best to understand the history.

- `x86`: (2.1.1) Refers to processors in the 8086 family. (80186 80286 80386 80486...). Usually, it means compatibility with the 80386 32-bit instruction set because 16-bit only is so old (TODO - this isn't perfectly accurate)
- `i686`: (2.1.6) Intel686. P6 Family Microarchitecture on the Pentium Pro. One of the 6th generation of `x86` processors.
- `i386`: (2.1.3) Intel386. AKA 80386. First 32-bit (TODO - fact check)
- `x86_64` The 64-bit instruction set (sometimes called amd64) brother of `x86`
    - backward compatible with `x86` (i.e., `x86` instructions can run on `x86_64` processors)


[32-bit and 64-bit:](https://www.aliencoders.org/content/basic-information-about-i386-i686-and-x8664-architectures/)
    
    - A 32-bit OS will run on a 32-bit or 64-bit processor without any problem.
    
    - A 32-bit application will run on a 32-bit or 64-bit OS without any problem.
    
    - But a 64-bit application will only run on a 64-bit OS, and a 64-bit OS will only run on a 64-bit processor

### The mega mebi tera tebi... confusion
Clearing things up because I haven't seen it stated in the official Intel manuals 
- An **official** mega byte (MB) is 1000^2 bytes. 
- An **official** mebibyte (MiB) is 1024^2 bytes

Intel says `MB` in their reference manuals because MiB wasn't introduced until later, and they didn't want to change all their manuals/references. For all intents and purposes, in the intel manuals, MB means 1024^2^, which conforms with intuition (e.g., 4 GBytes is $4\times2^{30}$ bytes, or $2^2 \times 2^{30}=2^{32}$ bytes, which fits on a 32-bit number).

### References
[^fn1]: [Intel Software Development Manual Volume 1A (Basic Architecture)](https://www.intel.com/content/www/us/en/architecture-and-technology/64-ia-32-architectures-software-developer-vol-1-manual.html)
    - Not going to help you write code, but useful in learning about the basics of computer stuff
    
[^fn2]: [Intel Software Development Manual Volume 3A (System Programming Guide Part 1)](https://www.intel.com/content/dam/www/public/us/en/documents/manuals/64-ia-32-architectures-software-developer-vol-3a-part-1-manual.pdf)
    - Good reference for GDT, protected mode, paging, etc. (The above also talks about paging and segmentation)

