#include <iostream>
#include <cassert>

int main() {
  bool red_light {true};
  bool green_light {false};

  std::cout << "bool: " << sizeof(bool) << std::endl;

  std::cout << red_light << std::endl;
  std::cout << std::boolalpha << red_light << std::endl;
  std::cout << green_light << std::endl;
}