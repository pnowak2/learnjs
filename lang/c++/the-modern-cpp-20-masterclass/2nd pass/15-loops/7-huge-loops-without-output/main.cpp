#include <iostream>

int main()
{
    for(size_t i{}; i < 10000; ++i) {
        std::cout << "i: " << i << std::endl;
    }

    size_t i {};

    while(i < 100000) {
        std::cout << "i: " << i << std::endl;
        i++;
    }

    return 0;
}