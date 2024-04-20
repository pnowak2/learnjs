#include <iostream>
#include <cstring>

int main()
{
    // compares char by char, stops on first difference returning -1 if smaller, 1 if bigger
    // returns 0 if strings are equal
    const char *message1 {"Abc"};
    const char *message2 {"Bcd"};
    std::cout << "strcomp: " << std::strcmp(message1, message2) << std::endl;

    message1 = "Bcd";
    message2 = "Abc";
    std::cout << "strcomp: " << std::strcmp(message1, message2) << std::endl;

    message1 = "Abc";
    message2 = "Abc";
    std::cout << "strcomp: " << std::strcmp(message1, message2) << std::endl;

    // strncmp, check only first n characters
    const size_t n {3};
    message1 = "Abcde";
    message2 = "Abcfg";
    std::cout << "strncomp: " << std::strncmp(message1, message2, n) << std::endl;

    return 0;
}