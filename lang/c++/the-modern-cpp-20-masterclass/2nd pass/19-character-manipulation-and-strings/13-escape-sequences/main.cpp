#include <iostream>

int main()
{
    std::cout << "hello on \"this\" world" << std::endl;
    std::cout << "hello on \nthis world" << std::endl;
    std::cout << "hello on \tthis world" << std::endl;
    std::cout << "hello on \\this world" << std::endl;

    return 0;
}