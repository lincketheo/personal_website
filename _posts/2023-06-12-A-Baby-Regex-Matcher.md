---
title: A Simple Regex Matcher
layout: single
date: 2023-06-12
categories: [computer science]
tags: [regex, algorithms]
subtitle: Writing a simple regex matcher in C
layout: post
difficulty: 2
published: true
---

## Introduction: A Simple Regex Matcher

In this post, I will define a regex and write a simple implementation in `C`.

The following is the description of our Regex:


***

Let $\Sigma$ denote the english alphabet,

- A regex character $a$ can either be '.', '\*' or $\in \Sigma$.

- A Kleene star ('\*') indicates that the preceeding character (there's garunteed to be a preceeding character before a Kleene star) can repeat 0 to many times.

- A '.' can take the place of any character.

For example:

The following (input, regex) pairs match (where $\epsilon$ represents the empty string):

$$aaa \quad a*$$

$$\epsilon \quad a*$$

***

## Regular Expressions

Each Regular Expression $r$ constructs a language $L(r)$ of all strings that satisfy $r$.

For example:

$$L(a*) = \{\epsilon, a, aa, aaa, \dots\}$$

A Regular Expression (RE) over some alphabet $\Sigma$ is defined via the following construction rules:

### Base Rules:

- $\epsilon$ is a RE
- $\forall x \in \Sigma$, x is a RE

### Construction Rules:

- $(r)\|(s)$ is a RE, where

$$(r)|(s) = L(r) \cup L(s)$$ 

- $(r)(s)$ is a RE, where

$$(r)(s) = \{xy : \forall x,y \quad x \in L(r) \quad y \in L(s)\}$$

- $(r)*$ is a RE, where

$$(r)* = L(\epsilon) \cup L(r) \cup L(rr) \cup \dots$$

Because we don't have support for paranthetical expressions in our simple regex, I'm calling our regex a "simple" regex. I'm unsure if there is an official term for Regexes that don't support grouping.

## Writing the Algorithm

I'll do this recursively. I want my "algorithm explained" series to really dive into the thought process of how to solve the problem, but remember that it's obviously much _easier_ to reason through as someone who's solved the problem already. This is _obviously_ not how simple my thought process was, rather a set of concrete "aha's" I went through and their subsequent effect on my code.

> Side Note: For me writing this blog post, I reasoned through how I could make my code much better / readable. It's an interesting observation that my first (successful) attempt looked like this:

```
bool matches_r(const char *input, const char *regex) {
  // Invalid cases
  if (*regex == '*') {
    printf("Invalid Regex\n");
    return false;
  }

  if (*regex == '\0') {
    return *input == '\0';
  }

  if (*regex != '\0' && *(regex + 1) != '*') {
    if (*regex == '.') {
      if (*input == '\0') {
        return false;
      }
      return matches_r(input + 1, regex + 1);
    } else {
      if (*input != *regex) {
        return false;
      }
      return matches_r(input + 1, regex + 1);
    }
  }

  if (*regex != '\0' && *(regex + 1) == '*') {
    bool valid_first = (*input != '\0') && (*input == *regex || *regex == '.');
    return matches_r(input, regex + 2) || (valid_first && matches_r(input + 1, regex));
  }

  printf("Can't reach this spot");
  return false;
}
```

> You'll see my subsequent attempt at the end, and the obvious reduction in gross logic is a direct consequence of writing this blog post and re doing my work. All that to say, re writing code and writing about your code does wonders!


Our outline will look something like this:

```c
bool matches(char *input, char *regex) {
  // todo
}
```

Notice that no matter where you are in the string, you need at least two characters to know what to match. That is, 'aa' and 'a*' mean two very different things. Therefore, we can eliminate the idea of a context free DSA in our regex.

In order to find all of our recursive conditions, observe that (where 'a' represents any character in $\Sigma$):

1. The first regex character could be a null terminator ('\0')
2. The first regex character could be '.' and the next character could not be '*'
  - E.g. ".a" or "."
3. The first regex character could be 'a' and the next character could not be '*'
  - E.g. "aa" or "a"
4. The first regex character could be '.' and the next character could be '*'
  - E.g. ".*"
5. The first regex character could be 'a' and the next character could be '*'
  - E.g. "a*"


And the logic for each case (quotes around "Check" to denote ambiguity):

1. Check if the input string is also empty - if it is, we've matched our string
2. "Check" the first character, then run `matches(input + 1, regex + 1)`
3. Similar to (2)
4. If the first character doesn't match, then we can simply check `matches(input, regex + 2)` because the kleene star can match 0 characters. Otherwise, if the character matches, then we can run `matches(input + 1, regex)`. Also note that if we execute (1-3) correctly, we can ensure we're not overflowing our buffer.
5. Similar to (4)

At a high level, here's our solution:

```
bool matches_r(const char *input, const char *regex) {
  if (*regex == '\0')
    return *input == '\0';

  bool match = (*regex == *input || *regex == '.');

  if (*(regex + 1) != '*')
    return match && matches_r(input + 1, regex + 1);

  return matches_r(input, regex + 2) || (match && matches_r(input + 1, regex));
}
```

But we slightly glossed over case (1). What if input is '\0' and regex matches case 2, we'll overflow our buffer (mentioned in (4)). _All we need to do is avoid adding anything to `input` if `input = '\0'`. It looks like `match` acts as a short circuit for each case this could happen, so let's just add the condition there:

### The Final Code:

```
bool matches_r(const char *input, const char *regex) {
  if (*regex == '\0')
    return *input == '\0';

  bool first_matches = (*input != '\0') && (*regex == *input || *regex == '.');

  if (*(regex + 1) != '*') 
    return first_matches && matches_r(input + 1, regex + 1);

  return matches_r(input, regex + 2) || (first_matches && matches_r(input + 1, regex));
}
```

## Memoizing

Classically, in dynamic programming, you'd recognize that you're executing duplicate code, so you "memoize" that code for later. That is, our problem has **optimal substructure**. I'll do this problem again in the future while accounting for this property.







































