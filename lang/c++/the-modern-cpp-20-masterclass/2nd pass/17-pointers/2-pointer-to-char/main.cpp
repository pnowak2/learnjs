#include <iostream>

int main()
{
    char *charPtr {nullptr};
    char letterA {'A'};

    charPtr = &letterA;

    std::cout << *charPtr << std::endl;

    const char * message {"Hello world"}; // first char gives its address to message pointer

    std::cout << message << std::endl;
    std::cout << *message << std::endl;

    // *message = 'B';

    char msg[] {"Hello world"};
    std::cout << msg << std::endl;
    msg[0] = 'B';
    std::cout << msg << std::endl;

    return 0;
}