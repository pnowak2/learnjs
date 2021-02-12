#include "src/lib/cpplib.h"

#include <map>
#include <vector>

#include "gtest/gtest.h"

TEST(CPPLibTest, ReturnHelloWorld) {
  std::string actual = greet("Piotr");
  std::string expected = "Hello Piotr";
  EXPECT_EQ(expected, actual);
}