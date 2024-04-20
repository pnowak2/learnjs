#include <iostream>

int main()
{
    // verbose nullptr check

    int * ptr {};

    if (!(ptr == nullptr)) {
        std::cout << "valid address: " << ptr;
    } else {
        std::cout << "nullptr" << std::endl;
    }

    ptr = new int{2};
    if (ptr) { // same as == nullptr
        std::cout << "valid address: " << ptr;
    } else {
        std::cout << "nullptr" << std::endl;
    }

    ptr = new int{2};

    return 0;
}