#include <iostream>
#include <cstring>

int main()
{
    const char message1[] {"Hello world"};
    const char *message2 {"Hello world"};

    std::cout << "message1: " << message1 << std::endl;
    std::cout << "message2: " << message2 << std::endl;

    // ignores null character
    std::cout << "strlen(message1): " << std::strlen(message1) << std::endl;
    // counts null character
    std::cout << "sizeof(message1): " << sizeof(message1) << std::endl;

    // still works correctly, ignores null character
    std::cout << "strlen(message2): " << std::strlen(message2) << std::endl;
    // prints only size of pointer
    std::cout << "sizeof(message2): " << sizeof(message2) << std::endl;

    return 0;
}