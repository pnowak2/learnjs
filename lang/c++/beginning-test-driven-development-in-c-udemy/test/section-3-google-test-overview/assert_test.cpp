#include <vector>
#include "gtest/gtest.h"

#include "src/lib/mylib.h"

TEST(TestAssertCountPositives, BasicTest) {
  // Arrange
  std::vector<int> inputVector {1, -2, 3, -4, 5, -6, -7};
  
  // Act
  int count = countPositives(inputVector);

  // Assert
  ASSERT_EQ(3, count);
}

TEST(TestAssertCountPositives, EmptyVectorTest) {
  // Arrange
  std::vector<int> inputVector {};
  
  // Act
  int count = countPositives(inputVector);

  // Assert
  ASSERT_EQ(0, count);
}

TEST(TestAssertCountPositives, AllNegativesTest) {
  // Arrange
  std::vector<int> inputVector {-1, -2, -3};
  
  // Act
  int count = countPositives(inputVector);

  // Assert
  ASSERT_EQ(0, count);
}

TEST(TestAssertCountPositives, AllNegativesTestUsingGE) {
  // Arrange
  std::vector<int> inputVector {-1, -2, -3};
  
  // Act
  int count = countPositives(inputVector);

  // Assert
  ASSERT_GE(0, count);
}
