#include <iostream>
#include <string>

int main () {
    std::cout << "Hello " << std::endl;

    int age {21};
    std::cout << "Age: " << age << std::endl;

    std::cerr << "Error message" << std::endl;
    std::clog << "Log message" << std::endl;

    int age2;
    std::string name;

    std::cout << "Your name and age: ";
    std::cin >> name;
    std::cin >> age2;

    std::cout << "Hello " << name << ", you are " << age2;

    return 0;
}