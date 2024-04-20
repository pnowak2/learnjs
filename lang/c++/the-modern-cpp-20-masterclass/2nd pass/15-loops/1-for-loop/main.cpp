#include <iostream>

int main()
{
    for(size_t i{0}; i < 5; ++i) {
        std::cout << "Hello " << i << std::endl;
    }
    

    size_t k {0};
    const size_t COUNT = 5;

    for(; k < COUNT; ++k) {
        std::cout << "Hello " << k << std::endl;
    }

    return 0;
}