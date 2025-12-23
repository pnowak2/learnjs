#include <iostream>

int main() {
  int dec = 15;
  int oct = 017; // 7 * 8^0 + 1 * 8^1
  int hex = 0x0f; // f * 15 ^ 0
  int bin = 0b00001111; // 1*2^0 + 1*2^1 + 1*2^2 + 1*2^3

  std::cout << dec << std::endl;
  std::cout << oct << std::endl;
  std::cout << hex << std::endl;
  std::cout << bin << std::endl;
}