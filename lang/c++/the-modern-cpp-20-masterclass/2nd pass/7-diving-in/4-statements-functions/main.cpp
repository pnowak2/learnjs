#include <iostream>
#include <string>

int main(){

    std::cout << "C++20 hello" << std::endl;

    int age {21};
    std::cout << "Age: " << age << std::endl;

    std::cerr << "Error appeared" << std::endl;
    std::clog << "Log message.." << std::endl;

    std::string name;
    int myAge {0};

    std::cout << "Please type your name and age" << std::endl;
    std::cin >> name >> myAge;
    // std::cin >> myAge;
    std::cout << "Hello " << name << ", your age: " << myAge << std::endl;

    std::string fullName {};
    int fullAge;
    std::cout << "Please type your full name and age" << std::endl;
    std::getline(std::cin, fullName);
    std::cin >> fullAge;
    std::cout << "Hello " << fullName << ", your age: " << fullAge << std::endl;

    return 0;
}