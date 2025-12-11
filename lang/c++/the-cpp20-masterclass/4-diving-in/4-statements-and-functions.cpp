#include <iostream>

int add(int a = 3, int b = 2) {
  int sum = a + b;

  return sum;
}

int main()
{
  int first {3};
  int second = {9};

  std::cout << "First number: " << first << std::endl;
  std::cout << "Second number" << second << std::endl;

  int sum = add(first, second);

  std::cout << "Sum is: " << sum << std::endl;
  std::cout << "Sum is: " << add() << std::endl;

  return 0;
}