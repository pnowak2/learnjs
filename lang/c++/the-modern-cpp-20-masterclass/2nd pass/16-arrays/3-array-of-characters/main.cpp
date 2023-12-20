#include <iostream>

int main()
{
    char message[] {'h', 'e', 'l', 'l', 'o','\0'}; // \0 is null termination string, in other case it prints garbage till another null character

    for(auto c: message){
        std::cout << c << std::endl;
    }

    std::cout << message << std::endl;

    message[4] = 'a';

    std::cout << message << std::endl;

    std::cout << "size: " << std::size(message) << std::endl;

    // with literal string, null char is added automatically

    char word[] {"hello"};
    std::cout << word << std::endl;
    std::cout << "size: " << std::size(word) << std::endl;

    // numbers and other are not special like array of chars
    int numbers[] {1, 2, 3};
    std::cout << numbers << std::endl;

    return 0;
}