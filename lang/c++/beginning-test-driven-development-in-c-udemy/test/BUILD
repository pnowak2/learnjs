load("@rules_cc//cc:defs.bzl", "cc_test")

cc_test(
    name = "all",
    srcs = glob(["**/*test.cpp"]),
    deps = [
        "//src/lib:CPPLib",
        "@com_google_googletest//:gtest_main",
    ],
)

cc_test(
    name = "cpplib_test",
    srcs = ["cpplib_test.cpp"],
    deps = [
        "//src/lib:CPPLib",
        "@com_google_googletest//:gtest_main",
    ],
)