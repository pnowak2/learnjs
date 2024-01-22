#include <iostream>
#include <string>

int main()
{
    std::string str1{"Hello"};
    std::string str2{"World"};

    std::string message = str1.append(str2).append(".");
    std::cout << message << std::endl;

    // append few same characters

    message.append(5, '!');
    std::cout << message << std::endl;

    message.append("garbage mister", 8, 6); // appends 6 chars of string starting from 8th char of original string
    std::cout << message << std::endl;

    return 0;
}