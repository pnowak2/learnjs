#include <iostream>

int main()
{
    bool a = true;
    bool b = false;

    std::cout << (a && b) << std::endl;
    std::cout << (a || b) << std::endl;
    std::cout << (a && ~b) << std::endl;
    std::cout << (a ^ b) << std::endl;

    return 0;
}