#include <iostream>
#include <cassert>

int main() {
  char c1 {'a'};
  char c2 {65};

  std::cout << "char: " << sizeof(char) << std::endl;
  std::cout << c1 << std::endl;
  std::cout << static_cast<int>(c1) << std::endl;
  std::cout << c2 << std::endl;
  std::cout << static_cast<int>(c2) << std::endl;
}