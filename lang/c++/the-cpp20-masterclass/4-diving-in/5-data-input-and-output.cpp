#include <iostream>

int main()
{
  std::cout << "Hello World" << std::endl;

  int age {45};
  std::string name;

  std::cout << "Age: " << age << std::endl;

  std::cerr << "Error message" << std::endl;
  std::clog << "Log message" << std::endl;

  std::cout << "Your name? " << std::endl; 
  // std::cin >> name;

  std::cout << "Your age? " << std::endl; 
  // std::cin >> age;

  std::cin >> name >> age;

  std::cout << "Hello, " <<  name << ", " << age << std::endl;

  return 0;
}