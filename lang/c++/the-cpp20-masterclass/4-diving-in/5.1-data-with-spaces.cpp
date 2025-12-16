#include <iostream>

int main()
{
  std::string fullName;

  std::cout << "Your name? " << std::endl;
  std::getline(std::cin, fullName);

  std::cout << "Hello, " << fullName << std::endl;

  return 0;
}