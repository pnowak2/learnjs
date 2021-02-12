
# C++ Template for Google Bazel, Test

> Can be used in Visual Studio Code

Features:

- [x] Building C++ files using Bazel in Visual Studio Code
- [x] [Google Test](https://github.com/google/googletest) for unit tests

You can use this template for most of your C++ projects with minimal changes.
## A Video on how to use this repo:

https://www.youtube.com/watch?v=0wMNtl2xDT0

https://youtu.be/JfOzsBi_irY

## Prerequisite: Installing Bazel

This repo uses `Bazel` for building C++ files.
You can install Bazel using this [link](https://docs.bazel.build/versions/master/install.html).

## Examples:

### Hello World Example:

You can run this using `bazel`:

```bash
bazel run src/main:main
```

# Using Google Test with Bazel in Visual Studio Code:

Here is a video that explains more about how to use Google Test with Bazel in Visual Studio Code:

<table><tr><td>

<a href="https://www.youtube.com/watch?v=0wMNtl2xDT0/">
<img border="5" alt="Bazel & Google Test in Visual Studio Code" src="https://raw.githubusercontent.com/ourarash/cpp-template/master/bazel_yt.png" width="400">
</a>
</td></tr></table>

## Example of running a test:

A sample test file is [tests/cpplib_test.cc](tests/cpplib_test.cc) which uses [tests/BUILD](tests/BUILD) file.

You can run the test using [`bazel`](installing-bazel):

```bash
bazel test test:all
```
### Credit

The initial version of this repo was inspired by [this post](https://www.ratanparai.com/c++/writing-unit-tests-with-bazel/).
