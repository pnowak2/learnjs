#include <vector>
#include "gtest/gtest.h"

#include "src/lib/mylib.h"

TEST(StringToUpperTest, EqualMatchCase) {
  // Arrange
  char inputString[] = "Hello World";

  // Act
  toUpper(inputString);

  // Assert
  ASSERT_STREQ("HELLO WORLD", inputString);
}

TEST(StringToUpperTest, NotEqualMatchCase) {
  // Arrange
  char inputString[] = "Hello World";

  // Act
  toUpper(inputString);

  // Assert
  ASSERT_STRNE("hELLO WORLD", inputString);
}

TEST(StringToUpperTest, EqualIgnoreCase) {
  // Arrange
  char inputString[] = "Hello World";

  // Act
  toUpper(inputString);

  // Assert
  ASSERT_STRCASEEQ("HELLO WORLD", inputString);
}

TEST(StringToUpperTest, NotEqualIgnoreCase) {
  // Arrange
  char inputString[] = "Hello World";

  // Act
  toUpper(inputString);

  // Assert
  ASSERT_STRCASENE("ahello world", inputString);
}