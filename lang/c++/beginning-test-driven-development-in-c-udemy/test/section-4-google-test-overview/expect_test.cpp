#include <vector>
#include "gtest/gtest.h"

#include "src/lib/mylib.h"

TEST(ExpectTestCountPositives, BasicTest) {
  // Arrange
  std::vector<int> inputVector {1, -2, 3, -4, 5, -6, -7};
  
  // Act
  int count = countPositives(inputVector);

  // Assert
  EXPECT_EQ(3, count);
}

TEST(ExpectTestCountPositives, EmptyVectorTest) {
  // Arrange
  std::vector<int> inputVector {};
  
  // Act
  int count = countPositives(inputVector);

  // Assert
  EXPECT_EQ(0, count);
}

TEST(ExpectTestCountPositives, AllNegativesTest) {
  // Arrange
  std::vector<int> inputVector {-1, -2, -3};
  
  // Act
  int count = countPositives(inputVector);

  // Assert
  EXPECT_EQ(0, count);
}

TEST(ExpectTestCountPositives, AllNegativesTestUsingGE) {
  // Arrange
  std::vector<int> inputVector {-1, -2, -3};
  
  // Act
  int count = countPositives(inputVector);

  // Assert
  EXPECT_GE(0, count);
}
