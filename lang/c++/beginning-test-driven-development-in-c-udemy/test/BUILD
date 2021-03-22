load("@rules_cc//cc:defs.bzl", "cc_test")

cc_test(
    name = "all",
    srcs = glob(["**/*test.cpp"]),
    deps = [
        "//src/lib:MyLib",
        "@com_google_googletest//:gtest_main",
    ],
)
