#include <iostream>

int main()
{
    // too much on heap
    // handle with exception mechanism or std::nothrow setting

    try {
        int *big{new int[1000000000000000000]};
    } catch(std::exception &ex) {
        std::cout << "bad_alloc error. ptr not initialized." << std::endl;
    }

    try {
        int *big{new(std::nothrow) int[1000000000000000000]};
    } catch(std::exception &ex) {
        std::cout << "should never happen" << std::endl;
    }

    // will throw bad alloc..

    try {
        for (size_t i{}; i < 100000000000; i++)
        {
            int *big{new int[10000000]};
        }
    }
    catch (std::exception &ex) {
        std::cout << "allocation failed.." << std::endl;
    }


    return 0;
}