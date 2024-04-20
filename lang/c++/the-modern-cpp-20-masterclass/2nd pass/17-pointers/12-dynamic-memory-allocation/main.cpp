#include <iostream>

int main()
{
    int * ptr = {nullptr};
    ptr = new int(24);
    std::cout << *ptr << std::endl;
    delete ptr;

    ptr = new int{16};
    std::cout << *ptr << std::endl;
    *ptr = 7;

    std::cout << *ptr << std::endl;
    delete ptr;

    delete ptr;
    ptr = nullptr;
    std::cout << "Never displayed, using nullptr.." << std::endl;
    std::cout << *ptr << std::endl;

    return 0;
}