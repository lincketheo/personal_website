<template>
<h2>Introduction: Some Measure Theory</h2>
<p>In this post, I will first lay the basic analysis groundwork needed to understand Borel Sigma Algebras (and of
    course, I will also explain sigma algebras). Then I will explain the basics of Measure Theory necessary for defining
    $L^p$ and weak-$L^p$ spaces in subsequent blog posts.</p>
<p>Most of this post's reference material comes from my own notes on Analysis, but these notes came from <a
        href="https://www.amazon.com/Analysis-Third-Texts-Readings-Mathematics/dp/9380250649">Terence Tao's</a> series
    on analysis. These are very readable introductions to analysis and I highly recommend them.</p>
<h2>Metric Spaces and Topologies (A prerequisite to the Borel Sigma Algebra)</h2>
<h3>Metric Space</h3>
<p>Roughly speaking, a metric is a way to measure distance between two things and map that distance to the real line. It
    maps an ordered pair of a set $X$ to the real numbers: $d : X \times X \rightarrow \mathbb{R}$ given the following
    rules:</p>
<p>For any two $x, y \in X$:</p>
<ol>
    <li>Positive: $d(x, y) \geq 0$</li>
    <li>Positive Definiteness: $d(x, y) = 0 \leftrightarrow x = y$</li>
    <li>Commutativity: $d(x, y) = d(y, x)$</li>
    <li>Triangle Inequality: $d(x, y) \leq d(x, z) + d(z, y)$</li>
</ol>
<p>We call metrics with properties 1-3 <em>Semi Metrics</em>. A <em>Metric Space</em> is a set X equipped with a metric
    $d$, abbreviated $(X, d)$.</p>
<h2>Topology</h2>
<p>Roughly speaking, a <em>topology of a metric space</em> is a collection of "balls" that overlap one another. These
    "balls" are defined via a metric. </p>
<p>For the metric space $(X, d)$, the "Ball centered at $x_0 \in X$ with radius r" is abbreviated $B(x_0, r)$ and is
    defined:</p>
<p>$$B(x_0, r) := {y \in X : d(x_0, r) \lt r}$$</p>
<p>Note the strict inequality. We call this an open set. </p>
<p>For a subset $E \subset X$:</p>
<ul>
    <li>The <em>Complement</em> of $E$ is</li>
</ul>
<p>$$E^c := X - E$$</p>
<ul>
    <li>The <em>Interior</em> of $E$ is</li>
</ul>
<p>$$Int(E) := {x \in X : \exists r &gt; 0 : B(x, r) \subset E}$$</p>
<p>Intuitively, an element of $X$ is in the interor if we can make a substantially small "ball" around $x$ that
    <em>fits</em> inside $E$. Although I haven't defined border yet, intuitively, think about a value on the border of
    $E$. No matter how small you make a "ball" surrounding $x$, you won't be able to fit the entire "Ball" inside $E$!
</p>
<ul>
    <li>The <em>Exterior</em> of $E$ is</li>
</ul>
<p>$$Ext(E) := {x \in X : \exists r &gt; 0 st B(x, r) \subset E^c}$$</p>
<p>Intuitively, a point is an exterior point to $E$ if it's an interior point to $E^c$</p>
<ul>
    <li>The <em>Boundary</em> of $E$ is</li>
</ul>
<p>$$\partial E := X - (Int(E) \cup Ext(E))$$</p>
<p>The <em>Topological Space $X = (X, F)$</em> is a set $X$ with a collection $F$ of subsets of $X$ called <em>open
    sets</em> that obey the following axioms:</p>
<ol>
    <li>$\emptyset, X$ are open</li>
    <li>The intersection of any finite number of open sets is open.</li>
    <li>The union of any arbitrary number of open sets is open.</li>
</ol>
<p>The collection $F$ is called a <em>topology</em> on X.</p>
<h2>Sigma Algebras (A prerequisite to Measure Spaces)</h2>
<p>We know about power sets of some set $X$ $P(X)$, and some of us know about <em>partitions</em> of a set $X$ (a set of
    pair-wise disjoint subsets of $X$ that collectively "cover" $X$)</p>
<blockquote>
    <p>Note: n-wise disjoint means if you select any $n$ elements from a set of sets, their intersection is empty. </p>
</blockquote>
<p>$${0, 1, 2}, {3, 4, 5}$$ </p>
<blockquote>
    <p>is 2-wise disjoint (pair-wise). </p>
</blockquote>
<p>$${0, 1, 2}, {2, 3, 4}, {4, 5, 0}$$ </p>
<blockquote>
    <p>is <em>not</em> 2-wise disjoint, but it is 3-wise disjoint.</p>
</blockquote>
<p>A sigma algebra ($\sigma -$algebra) ($\epsilon$) of a set $X$ is a set of subsets of $X$ that:</p>
<ul>
    <li>Is closed under complement:</li>
</ul>
<p>$$(B \in \epsilon) \rightarrow (B^c \in \epsilon)$$</p>
<ul>
    <li>Is closed under countable unions:</li>
</ul>
<p>$$(\forall_{j \in \mathbb{N}}(B_j \in \epsilon)) \rightarrow ((\cup_{i = 0}^{\infty}B_i) \in \epsilon)$$</p>
<ul>
    <li>Is closed under countable intersections:</li>
</ul>
<p>$$(\forall_{j \in \mathbb{N}}(B_j \in \epsilon)) \rightarrow ((\cap_{i = 0}^{\infty}B_i) \in \epsilon)$$</p>
<ul>
    <li>Contains $\emptyset$ and $X$:</li>
</ul>
<p>$$\emptyset, X \in \epsilon$$</p>
<p>Some examples of trivial sigma algebra's are:</p>
<ol>
    <li>The power set of $X$, $P(X)$</li>
    <li>The set:</li>
</ol>
<p>$${X, \emptyset}$$</p>
<p>Theorem A: The intersection of a (countably finite or infinite) set of $\sigma$-algebras is also a
    $\sigma$-algebra.</p>
<p>A $\sigma$-algebra <em>generated</em> by a set $M$ of arbitrary subsets of $X$ is the smallest $\sigma$-algebra that
    contains $M$ and is denoted in this post as $\sigma(M)$. In other words, the generated $\sigma$-algebra $\sigma(M)$
    is the intersection of all $\sigma$-algebra's that contain $M$ as a subset.</p>
<p>$$\sigma(M) = \cap_{(M \subset A) \land (A \: is \: \sigma-algebra)}A$$</p>
<p>This intersection is not the empty set because $M$ is an element of the powerset $P(X)$, which is a $\sigma$-algebra
    who shares an intersection with all other $\sigma$-algebras.</p>
<p>For example, consider the sets:</p>
<p>$$X = {a, b, c, d} \qquad M = {{ a}, {b }}$$</p>
<p>The $\sigma$-algebra generated by $M$ is:</p>
<p>$$={\emptyset, X, {a}, {b}, {a, b}, {b, c, d}, {a, c, b}, {c, d}}$$</p>
<p>All this really means is some $\sigma$-algebra that contains $M$. I got to the above set of sets by first
    defining:</p>
<p>$$\sigma(M) = {\emptyset, X...}$$</p>
<p>By definition of a $\sigma$-algebra, then adding $M$:</p>
<p>$$\sigma(M) = {\emptyset, X, {a}, {b}...}$$</p>
<p>Then completing the $\sigma$-algebra by including complements and unions of sets.</p>
<h2>The Borel Sigma Algebra</h2>
<p>The open sets $F$ of a topologic space $(X, F)$ generate a $\sigma$-algebra called the <strong>Borel $\sigma$
    algebra</strong>. </p>
<h2>Measure Space</h2>
<p>A measure space is a collection of $(X, \epsilon, \mu)$. Where $X$ is a set, $\epsilon$ is a $\sigma$-algebra of $X$
    and $\mu$ is a function $\mu : \epsilon \rightarrow [0, \infty]$ such that:</p>
<ol>
    <li>$\mu(\emptyset) = 0$</li>
    <li>$\mu(\cup_{n=1}^{\infty}B_n) = \sum_{n=1}^{\infty}\mu(B_n)$</li>
</ol>
<p>For any pairwise disjoint elements $B_n \in \epsilon$ </p>
<ul>
    <li>$\mu$ is a (positive) <em>measure</em> on $X$</li>
    <li>$B \in epsilon$ is called a <em>measurable set</em></li>
</ul>
<p>A measure space with set $X$ is called $\sigma$-<em>finite</em> if there is some sequence of measurable subsets $X_n
    \subset X$ such that:</p>
<p>$$X = \cup_{n=1}^{\infty}X_n$$</p>
<p>$$\mu(X_n) \lt \infty$$</p>
<p>A function $f: X \rightarrow \mathbb{R}$ is called <em>measurable</em> if it's preimage is measurable (that is ${x
    \in X : f(x) &gt; \lambda} is measurable for all $\lambda \in \mathbb{R}$</p>
<p>A function $f: X \rightarrow \mathbb{C}$ is called <em>measurable</em> if it's real and imaginary parts are
    measurable.</p>
</template>