---
title: Kotlin and Error Handling
date: 2023-02-08
categories: [Computer Science, Software Engineering]
tags: [error handling, kotlin]
---

# Introduction
Most of these insights came from [this](https://elizarov.medium.com/kotlin-and-exceptions-8062f589d07) blog post and my subsequent attempts to try and implement Elizarov's suggested patterns.

To illustrate these concepts, I'll be refactoring a [file](https://github.com/lincketheo/kotlin-notes/blob/main/src/main/kotlin/exceptions/blogpost/example1/ExceptionsBlogPost.kt) over and over. Notably _only the last block of code will have all the rules applied_. The corrected Rule 0 code will not be perfect because it has yet to use Rules 1, 2, etc. (Note: the final fixed code will also not be ideal, either. See my conclusion about how it's up to you).

Also, lots of these examples refer to SOLID design. There are many opinions on Object Oriented programming and how it can improve, but SOLID doesn't just apply to object-oriented design. Most statements of the form "Create a new class to .... to comply with abc principle" can easily be replaced with "Create a new function to ... to comply with abc principle". I won't be going into more detail, but try to keep an open mind on the principle I'm trying to illustrate in each rule and not the specific application to Object Oriented Design.

# Rules
As always, I prefer rules to lengthy blog posts. These rules should be well-defined and able to be expanded/modified. 

## Rule 0: Clean Coding Patterns Make it Easy to Handle Exceptions in the Right Place

_Clean code should separate functionality into understandable layers, and the layer responsible for causing the exceptions should handle it_. 

For example, consider Android's layered Repository / DataSource [approach](https://developer.android.com/topic/architecture/data-layer). The single responsibility of a DataSource is to fetch data from a specific location. The single responsibility of a Repository is to combine multiple data sources into one "source of truth." Naturally, handling data source errors shouldn't happen in the Repository because that eliminates the rich logic contained inside the Repository.

This rule seems obvious, but it's easy to forget. Here's our bad code refactored by moving exception handling to the layer that it applies

[Example 2](https://github.com/lincketheo/kotlin-notes/blob/main/src/main/kotlin/exceptions/blogpost/example2/ExceptionsBlogPost.kt)

Notice how the Repository is the class that handles all of the network and io errors coming in from the two data sources. What if we add another data source to our Repository, or Retrofit throws another exception that isn't currently handled? The ugly block of exception handling drowns out the rich, meaningful, logical code inside the `refresh` function.

## Rule 1: Don't swallow exceptions
This rule comes from a common mistake. We tell ourselves as programmers that we'll handle all exceptions, but you should only be handling exceptions if you know what to do with them. Otherwise, we sweep fundamental problems with our code under the rug.

We want to do _something_ in our code block with a failed network / local storage call. Something like showing a snack bar or pop-up. This step is where you need to consider the feature you're implementing. Each feature will have a different set of acceptance requirements. Let's assume our acceptance requirement is:
When the user refreshes their feed and something (anything) goes wrong, a snack bar pops up
We'll print to the screen to simplify our example rather than show a snack bar. There are a couple of solutions to this problem. I'll solve it by exposing a new exception (Be careful about this, I tend to prefer not writing new exceptions - see Rule 3 - but later on, we'll make this cleaner in Rule 2).

[Example 3](https://github.com/lincketheo/kotlin-notes/blob/main/src/main/kotlin/exceptions/blogpost/example3/ExceptionsBlogPost.kt)

## Rule 2: Sometimes Treat Exception Handling as a Responsibility
Our exception-handling code is getting complex, so let's separate exception-handling into a responsibility. In SOLID design, it's hard to figure out what "responsibility" means in "Single Responsibility." Certain code smells mean you should start pulling out code blocks into their responsible class:

1. [Cyclomatic Complexity](https://en.wikipedia.org/wiki/Cyclomatic_complexity) - When there are many ways to exit your code block, pull in multiple classes to handle each case.
2. Low [Code Cohesion](https://en.wikipedia.org/wiki/Cohesion_(computer_science)) - When two blocks of code are entirely disjoint from one another but exist in the same block, pull each block into a separate class.
3. Repeating blocks of code (even if it's not an exact repeat) - When two blocks look similar, you can sometimes pull that pattern into another subroutine.

The following block of code appears (almost identically) twice in our code:

```kotlin
try {
	doSomethingWithADataSource()
} catch(e: SomeDataException) {
	throw AppDataSourceException(...)
}
```

From Rule 0, we agreed that we'd handle all our data source exceptions in the data source layer, and in Rule 1, we decided we'd throw a single exception type for any data source problem. Let's define a new function, `attemptDataSourceOperation` that makes us stay loyal to those two patterns we said we'd follow. 

```kotlin
inline fun <T> attemptDataSourceOperation(
    catchExceptionTypes: Set<KClass<out Exception>>,
    onFailExposedMessage: String,
    block: () -> T
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
}
```

Now, if we want to catch exceptions in the data source and expose them as `AppDataSourceExceptions`, we can write the following code:

```kotlin
fun doSomethingInTheDataSource(): Data {
	return attemptDataSourceOperation(
		catchExceptionTypes = setOf(The exception types I want to catch),
		onFailExposedMessage = "doSomethingInTheDataSource failed!",
	) {
		attemptDataSourceOperationThatFails()
	}
}
```

[Example 4](https://github.com/lincketheo/kotlin-notes/blob/main/src/main/kotlin/exceptions/blogpost/example4/ExceptionsBlogPost.kt)

Now this might be a bit of overkill. However, it stays loyal to our architecture. The class `AppDataSourceException` exists, so any time a data source throws, an `AppDataSourceException` is probably thrown. However, this might be different for your application. Specific DataSource exceptions could cause other effects for the end user, where the single `AppDataSourceException` class is probably not the way to go. However, for our ACs, any data source exception was treated the same.

# Rule 3 - Prefer Not to Write New Exceptions

Exceptions we handle should only highlight something we can do something about. That means only writing new exceptions when it's something that _can_ go wrong in your application. A network can fail, and a user can have invalid credentials. You don't need to handle exceptions if your code isn't meant to throw that exception. For example, we usually don't need to handle `IllegalArgumentException`'s because, as programmers, we shouldn't be writing code using IllegalArguments! **If an exception highlights a bug in your code, let it go uncaught**. We can take measures to hide this fact from the user (such as writing a global uncaught exception handler that notifies the developers that something went wrong with the stack trace and tells the user with a generic "Something went wrong" message so that we don't crash the app). However, only write logic to catch sound logic. 

Sound logical exceptions are things that _can go wrong_. In my experience, these are the few times I will write a new exception (I am missing out on many cases, but many cases boil down to these rules):

1. Our ACs glob multiple exceptions into one. For example, our AC is "If anything goes wrong on a refresh related to network or local operations, tell the user something went wrong." We know that our refresh call could produce some HTTP exceptions, IO Exceptions, etc., so we can define a single exception, `AppDataSourceException`, that our refresh call handles. 
2. Our code encounters an unexpected problem. For example, a mobile developer has no way (in theory) to catch problems with their API so one might write an `UnexpectedAPIResponse` exception.

## Conclusion
Handling exceptions is no different than writing SOLID code. The examples I gave above are mostly thought experiments, and every developer should write code that complies with their ACs. It's always easy to go overboard, and as Software Engineers, we need to find the right balance of:

1. What should I do to make my code more readable?
2. What should I do to produce code promptly?
3. How should I protect myself from future ACs that the business might spring up on me?

Arguably, our final solution needs to follow number 3 better. Some AC that treats different data source exceptions might appear in the future, and our pretty code will be tough to refactor to account for this new AC. So take my suggestions with a grain of salt.
