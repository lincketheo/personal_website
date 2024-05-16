## Introduction: An Assortment of Concepts

In this post, I will explore some properties of natural numbers and abstract systems in mathematics. Reference material belongs in [Introduction to Meta Mathematics by Kleene](https://www.amazon.com/Introduction-Metamathematics-Stephen-Cole-Kleene/dp/0923891579) chapter 1.

## Cantor's Diagonalization Argument

> God made the integers, all the rest is the work of man -Kronecker (1886)

An **Enumerable Set** $S$ (often called **denumerable** or **countable** but _enumerable_ is the word I will use here to be consistent with Cantor's theory of sets) is one that can be placed in a 1-1 correspondence with the natural numbers.

Intuitively, you can write all the elements of $S$ in a comma-separated list using some algorithmic strategy. You can lay each element out one after the other and cover all of the elements of the set. The set of integers can be written as:

0, 1, -1, 2, -2, 3, -3...

And we can confidently account for all of the integers in this seemingly obvious pattern. When proving a set is enumerable, a math student is often tasked with finding a function to conclude that there is an injection from a set to the natural numbers; but you may also define an algorithm or pattern for enumerating through each of the elements of the set.

The set of rational numbers can be written as follows:

$\frac{1}{1}$, $\frac{2}{1}$, $\frac{1}{2}$, $\frac{1}{3}$, $\frac{2}{2}$, $\frac{3}{1}$, $\frac{4}{1}$, $\frac{3}{2}$, $\frac{2}{3}$...

See the pattern? It's tricky to see, but if we arrange the rational numbers in a square matrix with $\frac{1}{1}, \frac{1}{2}, \frac{1}{3}...$ on the top row and $\frac{1}{1}, \frac{2}{1}, \frac{3}{1}...$ on the left column, then we can snake through the diagonals of this matrix to "draw a straight line" through all the rational numbers.

This same layout shows that ordered pairs, ordered triples... can simply be layed out in an n-dimensional matrix and enumerated using a similar strategy shown above, which leads to some interesting claims such as "the set of all polynomials with integral coefficients are enumerable":

$$a_0x^n + a_1x^{n-1} + ... a_n = 0 \quad a_0 \neq 0$$

can be uniquely identified as:

$$(a_0, a_1... a_n)$$

which is enumerable.

What about the real numbers?

Let's assume the real numbers in the range $(0, 1)$ (it's easy to extend this proof to all real numbers) are enumerable and there's some algorithm for laying out all of them in a column:

$$r_0$$

$$r_1$$

$$r_2$$

...

Now, for each $r_i$ select the $i'th$ decimal place (so if $r_1 = 0.123$ select $2$) and add one to it and place it in the $i'th$ decimal place of a new number $r'$. For example:

$$r_0 = 0.100...$$

$$r_1 = 0.020...$$

$$r_2 = 0.003...$$

$$r' = 0.234$$

We can confidently say that $r'$ is a real number, but does not belong to that enumeration! Meaning the real numbers are not enumerable (e.g., a contradiction).

What did we just show? Earlier we showed that any finite collection of ordered natural numbers was enumerable. Just now, we showed that any _infinite_ collection of ordered natural numbers (where $0.123...$ can be uniquely identified by $(1, 2, 3, ...)$) is _not_ enumerable.

In other words, the (infinite) set of all infinitely enumerable sets is not enumerable.

> More formally: $\omega_1 = $ the set of all countable ordinal numbers

Whatever form of real analysis you learned, it is easy to see a similarity in this conclusion. For example, consider the following construction of the reals (with lots of pre-definitions left out, e.g. what's a $LIM$? That's not important for my point):

***
Definition 5.3.1 (Real numbers). A real number is defined to be an object of the form

$$LIM_{n\rightarrow \infty} a_n$$

where

$$(a_n)_{n=1}^{\infty}$$

is a Cauchy sequence of rational numbers. Two real numbers

$$LIM_{n\rightarrow \infty}a_n \quad and \quad LIM_{n\rightarrow\infty}b_n$$

are said to be equal iff

$$(a_n)_{n=1}^{\infty} \quad and \quad (b_n)_{n=1}^{\infty}$$

are equivalent Cauchy sequences. The set of all real numbers is denoted $\mathbb{R}$.

***

Every definition of the reals in some form of real-analysis will have some "second infinity." Whereas we only need one natural number to define the next (see the section on natural numbers), we need a sort of "second infinity" to define the real numbers.


## Cantor's theory of (naive) sets

Cantor defines a "set" and "element":

> By a 'set' we understand any collection M of definite well-distinguished objects m of our perception or our thought (which are called the 'elements' of M) into a while

Some facts about Cantor's sets include:

- Sets include the _empty_ set.

- Sets have a notion of equality ($M = N$) if they contain the same elements.

- Sets have a notion of equivalency ($M \sim N$) if there is a 1-1 correspondence between them.

The _cardinal number_ of a set $M$ is a distinct object $\bar{\bar{M}}$ that is associated in common with all sets (including $M$) that are equivalent to $M$:

$$\bar{\bar{N}} = \bar{\bar{M}} \quad iff \quad N \sim M$$

For now, I think this is all I want to cover on Cantor's theory of sets in this post (and set theory at all for that matter). Later on, I will describe some notable theorems in set theory (such as Cantor's theorem and how it leads to Cantor's paradox), and I will definitely describe Zarmelo Fraenkel set theory eventually, but for the sake of this initial post, I will stop here.

For further reading, you can refer to any well-written book on Set Theory ([Set Theory by Thomas Jech](https://www.google.com/books/edition/Set_Theory/WTAl997XDb4C?hl=en) is a good one) to continue further in the study of the theory of sets.

## Natural Numbers

We define the natural numbers by starting at a single object 0. A natural number can be obtained by taking the _successor_ ($n'$) of any other natural number ($n$). To a computer, all the natural numbers is:

$0, 0', (0')', ((0')')' ...$

I use "..." to indicate the continuation of a seemingly obvious pattern. I use $()$ to represent the natural number that is defined by some group of operations happening inside the $()$. From here on out, I will assume $(n')'$ is the same as $n''$. A more formal description is through the following propositions (CR meaning "construction rule"):

- CR1: 0 is a natural number
- CR2: If $n$ is a natural number, $n'$ is also a natural number
- CR3: The only natural numbers are given by CR1 and CR2.

1-3 are an _inductive definition_. 1-2 represent _direct clauses_, or instances of the thing we are trying to define. 3 represents the  _extremal clause_. Distinctness is often useful if we wish for 1-3 to provide utility to areas of mathematics, and it can be defined using the axiom:

- CR4: For any natural numbers $m$ and $n$ and $m' = n'$ only if $m = n$.

- CR5: For any natural number $n, n'\neq0$.

(Note that Peano ordered 3 as number 5 and pushed 4 and 5 back one spot).

## System

A system $S$ of objects is a set $D$ of objects which have established relationships. The natural numbers are a system of type $(D, 0, ')$ where $D$ is  a set, $0$ is a member of the set and $'$ is a 1-arity operator on members of $D$. If the objects in $D$ are only known through relationships of the system, the system is called _abstract_.

_Abstract_ systems are defined using some sort of structure. Further specification of what the objects are is a _representation_. Some examples of _representations_ of the axiomatic system presented in 1-5 are:

The positive natural numbers (just substitute 1 with 0)
The even natural numbers (start with 2 and assume the operator $n'$ is the familiar operation of $n + 2$.

Two _representations_ of the same _system_ are called _simply isomorphic_ (abbrv. _isomorphic_). That is:

> Two systems $(D_1, 0_1, '_1) and (D_2, 0_2, '_2)$ of the type $(D, 0, ')$ are simply isomorphic if there exists a 1-1 correspondence between $D_1$ and $D_2$ such that $0_1$ corresponds to $0_2$ and whenever $m_1 \leftrightarrow m_2$, then ${m_1}'_1 \leftrightarrow {m_2}'_2$

There are two main traditional introductions to systems in mathematics:

- _Genetic or constructive_ method is how we previously constructed the natural numbers.

- _Axiomatic or postulational_ method lays out some propositions that are assumed to be true (_axioms_ or _postulates_).

We can also reword 1-5 in our construction of the natural numbers as _axioms_:

P1: $0 \in D$

P2: $(n \in D) \rightarrow (n' \in D)$

P3: $(m \in D \land n \in D) \rightarrow (m' = n' \rightarrow m = n)$

P4: $(n \in D) \rightarrow (n' \neq 0)$

P5: $((P \subset D) \land (0 \in P) \land (n \in P \rightarrow n' \in P)) \rightarrow (P = D)$

Notably, some interesting things happen when we remove axioms. For example, if we remove axiom P4, then the new abstract system is the natural numbers and systems of residues mod $m$ for each positive integer $m$:

residues mod 3:

0, 1, 2, 0, 1, 2, 0, 1, 2...

Or if we replace P4 with P6: $n \in D \rightarrow (n' \neq n \land n'' = n)$, then we get residues mod 2:

0, 1, 0, 1, 0, 1....

Axioms may be satisfied by three cases:

- No system of objects exists that satisfy the axioms. Such a set of axioms are _vacuous_. Example:
    - P1-P6

We can show that there is no system that satisfies these axioms. Assume there was such a system. Then $0 \in D$ (P1), so $0' \in D$ (P2) so $0'' \in D$ (P2). By P6 and the fact that $0' \in D$, $0'' = 0 \land 0'' \neq 0'$. However, by P4, $0'' \neq 0$, leading to a contradiction. Therefore, our original claim that there is such a system is false by contradiction.

- Non-isomorphic systems exist that satisfy the axioms. That is, the axioms can represent more than one abstract system. Such a set of axioms are _non-vacuous_ and _ambiguous_. Example:
    - P1-P4
    - P1-P3, P5

In the second example, without P4, consider the example _representation_ of the abstract system:

$$0$$

$$0' = 1$$

$$1' = 0$$

(residues mod 2)

Or, similarly, consider the example _representation_:

$$0$$

$$0' = 1$$

$$1' = 2$$

$$2' = 0$$

(residues mod 3)

These two representations are not isomorphic because there is not a 1-1 correspondence between $D_1 = \{0, 1\}$ and $D_2 = \{0, 1, 2\}$.


- Exactly one abstract system satisfies the axioms. Such a set of axioms are _non-vacuous_ and _categorical_ Examples:
    - P1-P5
    - P1-P3, P5, P6

Sometimes, axioms cannot clearly be put into either category above. For example, until the discovery of non-Euclidean geometry (Lobatchevsky 1829 and Bolyai 1833), Euclid's axioms (without the parallel postulate) were considered categorical. An excellent story version of this controversy is illustrated in the book Godel Escher Bach by Hofstader, which is an enjoyable read, indeed.

## Non-enumerable sets (again)

Ask yourself if you can list some of the isomorphism representations (see definition later on) of natural numbers defined as a formal system. You might list the following:

1. The set of natural numbers
2. The set of odd integers
3. The set of even integers
4. The set of rational numbers
5. The set of numbers with more than two significant figures
6. The set of all primes
7. The set of all powers of 7

But what about the following set (S): The set of all numbers such that the natural number index in the above list of enumerable sets doesn't belong to the set that it specifies?

- (1) The set of natural numbers

Does 1 belong to the set of natural numbers? Yes! So 1 is not an element of S.

- (2) The set of odd integers

Does 2 belong to the set of even integers? No! So 2 is an element of S.

- (3) The set of even integers

Does 3 belong to the set of even integers? No! So 3 is an element of S.

And so on...

So far, our set $S = \{2, 3, 4, 5, 6 ...\}$.

Ok, easy, we can just call our new set Set 8. Fixed! But wait, 8 doesn't belong to Set 8, so we can do the same thing we just did and define Set 9, that _does_ contain the number 8. Fixed! Ah, yet again, 9 is not an element of Set 9.

We can intuitively conclude from this small exercise that it's impossible to algorithmically describe all of the sets of enumerable sets because we could continue to generate S-type sets (where they describe the set of all numbered indexes before it that are not in their set that they describe). So we have no room to generate the _other_ enumerable sets that could exist. In other words, the set of all sets is a tricky thing to define, and in fact, Cantor's paradox leads us to conclude that it _does not exist_ (by contradiction).

