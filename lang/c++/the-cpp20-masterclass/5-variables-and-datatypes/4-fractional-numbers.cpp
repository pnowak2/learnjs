#include <iostream>
#include <cassert>

int main() {
  std::cout << "float: " << sizeof(float) << std::endl;
  std::cout << "double: " << sizeof(double) << std::endl;
  std::cout << "long double: " << sizeof(long double) << std::endl;

  double n1 {5.6};
  double n2 {};

  assert(n1 == 5.6);
  assert(n2 == 0);

  float n3 = 1234;
  float n4 = 1.234e3;
  
  assert(n3 == n4);

  // assert(n1 / n2 == NAN);
}