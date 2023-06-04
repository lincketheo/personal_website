---
title: Some Silly Paradoxes 
layout: single
date: 2023-05-14
categories: [math]
tags: [paradoxes]
---

## Introduction: Paradoxes and Consistency

In this post, I will explore some interesting paradoxes. I'll probably add to this post in the future, but for now, I just want this post to be about some silly little paradoxes that have shown up in math in the past.

## Cantor's Paradox

Theorem A: The cardinality of a subset (N) of a set (M) is less than or equal to the cardinality of M. E.g., if $N \subset M$, then $\bar{\bar{N}} \leq \bar{\bar{M}}$. 

Cantor's Theorem: The cardinality of a set is strictly less than the cardinality of its power set. E.g., $\bar{\bar{M}} < \bar{\bar{P(M)}}$.

Cantor's theorem is easy to see from Theorem A. $M$ is a subset of $P(M)$ so $\bar{\bar{M}} \leq P(M)$. The proof of _strict_-ness (e.g. non-equality) requires a couple more steps. You can start by imagining the set $N$ of all the singleton sets of $M$, which shares the cardinality of $M$.

Cantor's Paradox: Suppose $M$ is the set of all sets. Then $P(M)$, being a set of all (sub) sets (of M), is an element of $M$. By cantor's theorem, $\bar{\bar{M}} < \bar{\bar{P(M)}}$, and **not** $\bar{\bar{P(M)}} \geq \bar{\bar{M}}$. However, because $M \subset P(M)$ and by Theorem A, $\bar{\bar{M}} \leq P(M)$. We've just proven that $M \leq P(M)$ and that this is not true. Hence, a contradiction.

## Russell's Paradox

Suppose a barber in a village decides to cut the hair of all the people in the village who _do not cut their own hair_. Should the barber cut his hair? 

Suppose every city in Colorado must have a representative. Every city can have a different representative. Sometimes the representatives of a city do not live in that city. Suppose a law is passed that creates another city S for all the representatives that are not residents of their city to reside. Where should the representative of S reside?

> Library of Congress, a bibliography of all those bibliographies in the Library of Congress which do not list themselves.

Consider the set of all sets that are not members of themselves (T):

- $S = \{a, b, c\}$ is a member of T

- $S = \{S, a, b\}$ is not a member of T

Is T a member of itself? 

- Suppose Yes: T is a member of itself. Then T is a set that is a member of itself, so by definition, it is not a member of T! This shows that T must _not_ be a member of itself (reductio by absurdum).

- Suppose No: T is not a member of itself. Then T is not a member of itself, so by definition, it is a member of T! This shows that T _must_ be a member of itself (reductio by absurdum).

## The Epimendies Paradox

> "Cretans are always liars..." - Epimenides of Crete (Epimendies was a Cretan)

Certainly, if Epimenides' statement is true, then Cretans will always tell lies. However, Epimenides' himself was a Cretan, so he has just shown that he told a truth, invalidating his claim!

So it must be that some Cretans in the past, present, or future tell the truth! However, what if the only thing all Cretans ever said were this sentence? Then all Cretans have ever done is lie!

A more obvious form of the paradox is the sentence:

"This sentence is not true"

If the sentence is true, then the sentence is not true. So by absurdum, the sentence must not be true!

If the sentence is not true, then it must be true. So by absurdum, the sentence must be true!


