<template>
<h2>Introduction</h2>
<p>Most of these insights came from <a href="https://elizarov.medium.com/kotlin-and-exceptions-8062f589d07">this</a>
    blog post and my subsequent attempts to try and implement Elizarov's suggested patterns. </p>
<p>To illustrate these concepts, I'll be refactoring a <a
        href="https://github.com/lincketheo/kotlin-notes/blob/main/src/main/kotlin/exceptions/blogpost/example1/ExceptionsBlogPost.kt">file</a>
    over and over. Notably <em>only the last block of code will have all the rules applied</em>. The corrected Rule 0
    code will not be perfect because it has yet to use Rules 1, 2, etc. (Note: the final fixed code will also not be
    ideal, either. See my conclusion about how it's up to you).</p>
<p>Also, lots of these examples refer to SOLID design. There are many opinions on Object Oriented programming and how it
    can improve, but SOLID doesn't just apply to object-oriented design. Most statements of the form "Create a new class
    to .... to comply with abc principle" can easily be replaced with "Create a new function to ... to comply with abc
    principle". I won't be going into more detail, but try to keep an open mind on the principle I'm trying to
    illustrate in each rule and not the specific application to Object Oriented Design.</p>
<p>As always, I prefer rules to lengthy blog posts. These rules should be well-defined and able to be
    expanded/modified. </p>
<h3>Rule 0: Clean Coding Patterns Make it Easy to Handle Exceptions in the Right Place</h3>
<p><em>Clean code should separate functionality into understandable layers, and the layer responsible for causing the
    exception should handle it</em>. </p>
<p>For example, consider Android's layered Repository / DataSource <a
        href="https://developer.android.com/topic/architecture/data-layer">approach</a>. The single responsibility of a
    DataSource is to fetch data from a specific location. The single responsibility of a Repository is to combine
    multiple data sources into one "source of truth." Naturally, handling data source errors shouldn't happen in the
    Repository because that eliminates the rich logic contained inside the Repository.</p>
<p>This rule seems obvious, but it's easy to forget. Here's our bad code refactored by moving exception handling to the
    layer that it applies</p>
<p>
    <a href="https://github.com/lincketheo/kotlin-notes/blob/main/src/main/kotlin/exceptions/blogpost/example2/ExceptionsBlogPost.kt">Example
        2</a></p>
<p>Notice how the Repository is the class that handles all of the network and io errors coming in from the two data
    sources. What if we add another data source to our Repository, or Retrofit throws another exception that isn't
    currently handled? The ugly block of exception handling drowns out the rich, meaningful, logical code inside the
    <code>refresh</code> function.</p>
<h3>Rule 1: Don't swallow exceptions</h3>
<p><em>When you handle an exception, you need to actually do something in your code (usually more than just logging),
    otherwise, it gets lost</em></p>
<p>This rule comes from a common mistake. We tell ourselves as programmers that we'll handle all exceptions, but you
    should only be handling exceptions if you know what to do with them. Otherwise, we sweep fundamental problems with
    our code under the rug.</p>
<p>We want to do <em>something</em> in our code block with a failed network / local storage call. Something like showing
    a snack bar or pop-up. This step is where you need to consider the feature you're implementing. Each feature will
    have a different set of acceptance requirements. Let's assume our acceptance requirement is:</p>
<p>When the user refreshes their feed and something (anything) goes wrong, a snack bar pops up</p>
<p>We'll print to the screen to simplify our example rather than show a snack bar. There are a couple of solutions to
    this problem. I'll solve it by exposing a new exception (Be careful about this, I tend to prefer not writing new
    exceptions - see Rule 3 - but later on, we'll make this cleaner in Rule 2).</p>
<p>
    <a href="https://github.com/lincketheo/kotlin-notes/blob/main/src/main/kotlin/exceptions/blogpost/example3/ExceptionsBlogPost.kt">Example
        3</a></p>
<h3>Rule 2: Consider Treating Exception Handling as a Responsibility</h3>
<p><em>If you can, treat exception handling logic as a responsibility to make code more meaningful</em></p>
<p>Our exception-handling code is getting complex, so let's separate exception-handling into a responsibility. In SOLID
    design, it's hard to figure out what "responsibility" means in "Single Responsibility." Certain code smells mean you
    should start pulling out code blocks into their responsible class:</p>
<ol>
    <li><a href="https://en.wikipedia.org/wiki/Cyclomatic_complexity">Cyclomatic Complexity</a> - When there are many
        ways to exit your code block, pull in multiple classes to handle each case.
    </li>
    <li>Low <a href="https://en.wikipedia.org/wiki/Cohesion_(computer_science)">Code Cohesion</a> - When two blocks of
        code are entirely disjoint from one another but exist in the same block, pull each block into a separate class.
    </li>
    <li>Repeating blocks of code (even if it's not an exact repeat) - When two blocks look similar, you can sometimes
        pull that pattern into another subroutine.
    </li>
</ol>
<p>The following block of code appears (almost identically) twice in our code:</p>
<p><code>kotlin
    try {
    doSomethingWithADataSource()
    } catch(e: SomeDataException) {
    throw AppDataSourceException(...)
    }</code></p>
<p>From Rule 0, we agreed that we'd handle all our data source exceptions in the data source layer, and in Rule 1, we
    decided we'd throw a single exception type for any data source problem. Let's define a new function, <code>attemptDataSourceOperation</code>
    that makes us stay loyal to those two patterns we said we'd follow. </p>
<p><code>kotlin
    inline fun &lt;T&gt; attemptDataSourceOperation(
    catchExceptionTypes: Set&lt;KClass&lt;out Exception&gt;&gt;,
    onFailExposedMessage: String,
    block: () -&gt; T
    ): T {
    try {
    return block()
    } catch (e: Exception) {
    catchExceptionTypes.find { it.isInstance(e) }?.let {
    throw AppDataSourceException(
    message = onFailExposedMessage,
    cause = e,
    )
    }
    throw e
    }
    }</code></p>
<p>Now, if we want to catch exceptions in the data source and expose them as <code>AppDataSourceExceptions</code>, we
    can write the following code:</p>
<p><code>kotlin
    fun doSomethingInTheDataSource(): Data {
    return attemptDataSourceOperation(
    catchExceptionTypes = setOf(The exception types I want to catch),
    onFailExposedMessage = "doSomethingInTheDataSource failed!",
    ) {
    attemptDataSourceOperationThatFails()
    }
    }</code></p>
<p>
    <a href="https://github.com/lincketheo/kotlin-notes/blob/main/src/main/kotlin/exceptions/blogpost/example4/ExceptionsBlogPost.kt">Example
        4</a></p>
<p>Now this might be a bit of overkill. However, it stays loyal to our architecture. The class <code>AppDataSourceException</code>
    exists, so any time a data source throws, an <code>AppDataSourceException</code> is probably thrown. However, this
    might be different for your application. Specific DataSource exceptions could cause other effects for the end user,
    where the single <code>AppDataSourceException</code> class is probably not the way to go. However, for our ACs, any
    data source exception was treated the same.</p>
<h3>Rule 3 - Prefer Not to Write New Exceptions</h3>
<p><em>Don't write new exceptions unless they should actually happen while in production</em></p>
<p>Exceptions we handle should only highlight something we can do something about. That means only writing new
    exceptions when it's something that <em>can</em> go wrong in your application. A network can fail, and a user can
    have invalid credentials. You don't need to handle exceptions if your code isn't meant to throw that exception. For
    example, we usually don't need to handle <code>IllegalArgumentException</code>'s because, as programmers, we
    shouldn't be writing code using IllegalArguments! <strong>If an exception highlights a bug in your code, let it go
        uncaught</strong>. We can take measures to hide this fact from the user (such as writing a global uncaught
    exception handler that notifies the developers that something went wrong with the stack trace and tells the user
    with a generic "Something went wrong" message so that we don't crash the app). However, only write logic to catch
    sound logic. </p>
<p>Sound logical exceptions are things that <em>can go wrong</em>. In my experience, these are the few times I will
    write a new exception (I am missing out on many cases, but many cases boil down to these rules):</p>
<ol>
    <li>Our ACs glob multiple exceptions into one. For example, our AC is "If anything goes wrong on a refresh related
        to network or local operations, tell the user something went wrong." We know that our refresh call could produce
        some HTTP exceptions, IO Exceptions, etc., so we can define a single exception,
        <code>AppDataSourceException</code>, that our refresh call handles.
    </li>
    <li>Our code encounters an unexpected problem. For example, a mobile developer has no way (in theory) to catch
        problems with their API so one might write an <code>UnexpectedAPIResponse</code> exception.
    </li>
</ol>
<h2>Conclusion</h2>
<p>Handling exceptions is no different than writing SOLID code. The examples I gave above are mostly thought
    experiments, and every developer should write code that complies with their ACs. It's always easy to go overboard,
    and as Software Engineers, we need to find the right balance of:</p>
<ol>
    <li>What should I do to make my code more readable?</li>
    <li>What should I do to produce code promptly?</li>
    <li>How should I protect myself from future ACs that the business might spring up on me?</li>
</ol>
<p>Arguably, our final solution needs to follow number 3 better. Some AC that treats different data source exceptions
    might appear in the future, and our pretty code will be tough to refactor to account for this new AC. So take my
    suggestions with a grain of salt.</p>
</template>