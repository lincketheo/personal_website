---
title: Lp Spaces and Distribution Functions
layout: single
date: 2023-06-12
categories: [math]
tags: [fourier]
subtitle: Examining the Distribution Function and more on Borel and Lebesgue Measures
layout: post
difficulty: 4
published: true
---

## Introduction: Lp Spaces and Distribution Functions

In this post, I will define some more properties of the Borel measure, introduce the Lebesgue measure and introduce the Distribution Function and prove a couple of interesting properties.

**Note**: I'm going pretty slow in this foundational work and definitions because:

a) I think it's important to solidify the basics before moving on to more complex problems (after which, I think it's ok to speed up)

b) It's been a while since I was rigorous in mathematics

rest assured, this series will speed up and I will not spend as much time with definitions (just read the book!) and more with intuition and applications.

## Some Definitions


***

> Intuitively, a **$\sigma$-finite** measure space can be represented by the countable union of subsets $X_n$, each of which has a finite measure.

**Definition**: A measure space $X$ is **$\sigma$-finite** if there exists a sequence of measurable subsets $X_n$ such that:

$$X = \cup_{n=1}^{\infty}X_n$$

$$\mu(X_n) \lt \infty$$

***

> Intuitively, a _characteristic function_ on a set $X$ (denoted $\chi_{X}(x)$) is equal to $1$ if $x \in X$, otherwise, $0$.

**Definition**: A **finitely simple function** is a finite linear combination of _characteristic functions_ defined on pairwise disjoint sets $B_j$ with complex valued coefficients:

$$\sum_{j=1}^Nc_j\chi_{B_j}$$

***

**Definition**: A **countable simple function** is the same as a finitely simple function with $N=\infty$

***

**Remark**: Every nonnegative measurable function is the pointwise limit of an increasing sequence of simple functions. These can be finitely simple if the measure space is $\sigma$-finite

***

**Definition**: 

- For $p \in (0, \infty)$, $L^p(X, \mu)$ (often abrv $L^p$ when the measure space is known) is the set of all complex valued $\mu$ measurable functions on $X$ whoes modulus to the pth power is integrable.

- $L^{\infty}(X, \mu)$ is the set of all complex valued $\mu$-measurable functions such that for some $B>0$, $\mu(\{x : \|f(x)\| > B\}) = 0$.

- $L^p(\mathbb{R^n})$ is the space $L^p(\mathbb{R}^n, dx)$ where $dx$ is an $n$-dimensional Lebesque measure on $\mathbb{R}^n$.

***

**Definition**: A Borel measure on $\mathbb{R}^n$ is **regular** if it satisfies the two conditions below:

> Intuitively, a **regular** Borel measure allows you to break around the complexities of open-ness and closed-ness. The set $(0, 1]$ should (intuitively) have the same (Lebesgue) measure as $[0, 1]$. We call this property **regular**. If you took a compact subset (closed and bounded) $K$ (which one may argue has more of an intuitive "measure" than an open set) and expanded it inside $E$ so that it's measure grows to the largest measure possible inside $E$, then that should be the measure of $E$ (for a regular Borel measure):


$$\mu(E) = sup\{\mu(K) : K \subset E, \quad K \, compact\}$$

> We can also think of an open set "closing in on" $E$ until the point in which they have the same measure (for a regular Borel measure):

$$\mu(E) = inf\{\mu(O) : E \subset O, \quad O \, open\}$$


***

> Intuitively, we used to take function norms all the time - now we're just doing so using the Lebesgue integral instead of the Lebesgue measure $dx$:

**Definition**: For $p\in(0,\infty)$, the $L^p$ norm (called the quasi norm for $p < 1$) is definied:

$$\|f\|_{L^p(X, \mu)} = (\int_{X}|f(x)|^pd\mu(x))^{\frac{1}{p}}$$

and, 

$$||f||_{L^{\infty}(X, \mu)} = inf\{B > 0 : \mu(\{x : |f(x)| > B\}) = 0\}$$

> This definition of the $\infty$ norm can intuitively be thought of as pushing a line ($B$) down until it approaches the "top" of $f$ (or the maximum value of $f$).

***


## Distribution Functions

***

**Definition**: for a measurable function $f$, the **distribution function** of $f$ is $d_f : [0, \infty) \rightarrow [0, \infty]$:

$$d_f(\alpha) = \mu(\{x \in X : |f(x)| > \alpha\})$$

***

Consider the finitely simple function:

$$f(x) = a_3 \quad \text{if } x\in E_3$$

$$f(x) = a_2 \quad \text{if } x\in E_2$$

$$f(x) = a_1 \quad \text{if } x\in E_1$$

$$f(x) = 0 \quad \text{else}$$

With $a_1 > a_2 > a_3$ and $E_j$ pairwise disjoint. This function is just a collection of three "rectangles" (as are all finitely simple functions). For the distribution function $d_f(\alpha)$, 

- Consider when $\alpha \geq a_1$ (so it's greater than all values of $f(x)$. Then clearly, $d_f(\alpha)=0$ because there is no $x$ that satisfies the set conditions, so the measure of the empty set is 0. 

- Consider when $a_2 \leq \alpha \lt a_1$, (so the line intersects the $a_1$ "rectangle"), then $d_f(\alpha) = \mu(E_1)$.

- Consider when $a_3 \leq \alpha \lt a_2$, then $d_f(\alpha) = \mu(E_2 \cup E_1) = \mu(E_2) + \mu(E_1)$.

- Consider when $\alpha \lt a_3$, then $d_f(\alpha) = \mu(E_3 \cup E_2 \cup E_1) = \mu(E_3) + \mu(E_2) + \mu(E_1)$.

**Exercise**: Try this same thing for a more interesting function like $f(x) = x^2$ defined on $[0, 10]$. What about $[0, \infty)$?



















