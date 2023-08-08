---
title: Lp Spaces Prerequisites
layout: single
date: 2023-05-14
categories: [math]
tags: [fourier analysis, measure theory]
subtitle: A review of basic analysis, measure theory, and some exploration on the Borel Sigma Algebra
layout: post
difficulty: 4
published: true
---

## Introduction: Some Measure Theory

In this post, I will first lay the basic analysis groundwork needed to understand Borel Sigma Algebras (and of course, I will also explain sigma algebras). Then I will explain the basics of Measure Theory necessary for defining $L^p$ and weak-$L^p$ spaces in subsequent blog posts.

Most of this post's reference material comes from my own notes on Analysis, but these notes came from [Terence Tao's](https://www.amazon.com/Analysis-Third-Texts-Readings-Mathematics/dp/9380250649) series on analysis. These are very readable introductions to analysis and I highly recommend them.

## Metric Spaces and Topologies (A prerequisite to the Borel Sigma Algebra)

### Metric Space

Roughly speaking, a metric is a way to measure distance between two things and map that distance to the real line. It maps an ordered pair of a set $X$ to the real numbers: $d : X \times X \rightarrow \mathbb{R}$ given the following rules:

For any two $x, y \in X$:

1. Positive: $d(x, y) \geq 0$
2. Positive Definiteness: $d(x, y) = 0 \leftrightarrow x = y$
3. Commutativity: $d(x, y) = d(y, x)$
4. Triangle Inequality: $d(x, y) \leq d(x, z) + d(z, y)$

We call metrics with properties 1-3 _Semi Metrics_. A _Metric Space_ is a set X equipped with a metric $d$, abbreviated $(X, d)$.

### Topology

Roughly speaking, a _topology of a metric space_ is a collection of "balls" that overlap one another. These "balls" are defined via a metric. 

For the metric space $(X, d)$, the "Ball centered at $x_0 \in X$ with radius r" is abbreviated $B(x_0, r)$ and is defined:

$$B(x_0, r) := \{y \in X : d(x_0, r) \lt r\}$$

Note the strict inequality. We call this an open set. 

For a subset $E \subset X$:

- The _Complement_ of $E$ is 

$$E^c := X - E$$

- The _Interior_ of $E$ is

$$Int(E) := \{x \in X : \exists r > 0 : B(x, r) \subset E\}$$

Intuitively, an element of $X$ is in the interor if we can make a substantially small "ball" around $x$ that _fits_ inside $E$. Although I haven't defined border yet, intuitively, think about a value on the border of $E$. No matter how small you make a "ball" surrounding $x$, you won't be able to fit the entire "Ball" inside $E$!

- The _Exterior_ of $E$ is

$$Ext(E) := \{x \in X : \exists r > 0 \, st \, B(x, r) \subset E^c\}$$

Intuitively, a point is an exterior point to $E$ if it's an interior point to $E^c$

- The _Boundary_ of $E$ is

$$\partial E := X - (Int(E) \cup Ext(E))$$

The _Topological Space $X = (X, F)$_ is a set $X$ with a collection $F$ of subsets of $X$ called _open sets_ that obey the following axioms:

1. $\emptyset, X$ are open
2. The intersection of any finite number of open sets is open.
3. The union of any arbitrary number of open sets is open.

The collection $F$ is called a _topology_ on X.

## Sigma Algebras (A prerequisite to Measure Spaces)

We know about power sets of some set $X$ $P(X)$, and some of us know about _partitions_ of a set $X$ (a set of pair-wise disjoint subsets of $X$ that collectively "cover" $X$)

> Note: n-wise disjoint means if you select any $n$ elements from a set of sets, their intersection is empty. 

$$\{0, 1, 2\}, \{3, 4, 5\}$$ 

> is 2-wise disjoint (pair-wise). 

$$\{0, 1, 2\}, \{2, 3, 4\}, \{4, 5, 0\}$$ 

> is _not_ 2-wise disjoint, but it is 3-wise disjoint.

A sigma algebra ($\sigma -$algebra) ($\epsilon$) of a set $X$ is a set of subsets of $X$ that:

- Is closed under complement:

$$(B \in \epsilon) \rightarrow (B^c \in \epsilon)$$

- Is closed under countable unions:

$$(\forall_{j \in \mathbb{N}}(B_j \in \epsilon)) \rightarrow ((\cup_{i = 0}^{\infty}B_i) \in \epsilon)$$

- Is closed under countable intersections:

$$(\forall_{j \in \mathbb{N}}(B_j \in \epsilon)) \rightarrow ((\cap_{i = 0}^{\infty}B_i) \in \epsilon)$$

- Contains $\emptyset$ and $X$:

$$\emptyset, X \in \epsilon$$

Some examples of trivial sigma algebra's are:

1. The power set of $X$, $P(X)$
2. The set: 

$$\{X, \emptyset\}$$

Theorem A: The intersection of a (countably finite or infinite) set of $\sigma$-algebras is also a $\sigma$-algebra.

A $\sigma$-algebra _generated_ by a set $M$ of arbitrary subsets of $X$ is the smallest $\sigma$-algebra that contains $M$ and is denoted in this post as $\sigma(M)$. In other words, the generated $\sigma$-algebra $\sigma(M)$ is the intersection of all $\sigma$-algebra's that contain $M$ as a subset.

$$\sigma(M) = \cap_{(M \subset A) \land (A \: is \: \sigma-algebra)}A$$

This intersection is not the empty set because $M$ is an element of the powerset $P(X)$, which is a $\sigma$-algebra who shares an intersection with all other $\sigma$-algebras.

For example, consider the sets:

$$X = \{a, b, c, d\} \qquad M = \{\{a\}, \{b\}\}$$

The $\sigma$-algebra generated by $M$ is:

$$=\{\emptyset, X, \{a\}, \{b\}, \{a, b\}, \{b, c, d\}, \{a, c, b\}, \{c, d\}\}$$

All this really means is some $\sigma$-algebra that contains $M$. I got to the above set of sets by first defining:

$$\sigma(M) = \{\emptyset, X...\}$$

By definition of a $\sigma$-algebra, then adding $M$:

$$\sigma(M) = \{\emptyset, X, \{a\}, \{b\}...\}$$

Then completing the $\sigma$-algebra by including complements and unions of sets.

## The Borel Sigma Algebra

The open sets $F$ of a topologic space $(X, F)$ generate a $\sigma$-algebra called the **Borel $\sigma$ algebra**. 

## Measure Space

### Intuition

Intuitively, mathematicians needed a way to "measure" a set. Consider the Lebesque integral as an example motivator. We wish to stray away from the classical Riemann integral because it often breaks with discontinuities. A Riemann integral can be applied to a function with _countably finite_ discontinuities, but consider the function:

$$f(x) = 0 \quad if \quad x \in \mathbb{Q}, \quad 1 \quad if \quad x \in \mathbb{R}-\mathbb{Q}$$

Clearly, this function is not Riemann integrable. What if we had a notion of measuring the set $\mathbb{Q}$ and $\mathbb{R}$? Particularly, if we say there are more real numbers than rational numbers (from Cantor's argument - see my previous post), we know that this function must be (at least) more than $\frac{1}{2}$. Intuitively, we _know_ there must be some way to "measure" the area of this 2 dimensional "curve" that a Riemann integral just doesn't support. 

The lebesque integral abstracts out the term measurement and starts with the y-axis. When $f(x) = 0$, we know 

$$x \in \mathbb{Q}_{[0,1]}$$ 

and if $f(x) = 1$ we know that 

$$x \in \mathbb{R}_{[0,1]}$$ 

so why not just "measure" the two sets $\mathbb{Q}$ and $\mathbb{R}-\mathbb{Q}$ on the interval $[0, 1]$? In general, a measure space equipts a set with some notion of length, area, volume, etc.

$$\int_{[0,1]}f(x)d\mu(x)$$

Where $\mu(x)$ is the _measure_ of some set element of some $sigma$-alebgra of the measurable space $[0,1]$

### Definition 

A measure space is a collection of $(X, \epsilon, \mu)$. Where $X$ is a set, $\epsilon$ is a $\sigma$-algebra of $X$ and $\mu$ is a function $\mu : \epsilon \rightarrow [0, \infty]$ such that:

1. $\mu(\emptyset) = 0$
2. $\mu(\cup_{n=1}^{\infty}B_n) = \sum_{n=1}^{\infty}\mu(B_n)$

For any pairwise disjoint elements $B_n \in \epsilon$ 

- $\mu$ is a (positive) _measure_ on $X$
- $B \in epsilon$ is called a _measurable set_

A measure space with set $X$ is called $\sigma$-_finite_ if there is some sequence of measurable subsets $X_n \subset X$ such that:

$$X = \cup_{n=1}^{\infty}X_n$$

$$\mu(X_n) \lt \infty$$



A function $f: X \rightarrow \mathbb{R}$ is called _measurable_ if it's preimage is a measurable set (that is 

$$\{x \in X : f(x) > \lambda\}$$

is measurable for all $\lambda \in \mathbb{R}$)

A function $f: X \rightarrow \mathbb{C}$ is called _measurable_ if it's real and imaginary parts are measurable.






