#include <iostream>

int main()
{
    size_t size {3};
    int *ptr_array {new(std::nothrow) int[size]}; // garbage values, hence no init
    int *ptr_array2 {new(std::nothrow) int[size]{}}; // all values inited to 0's
    int *ptr_array3 {new(std::nothrow) int[]{1, 2, 3}}; // init with those very values

    for(size_t i{}; i < size; i++) {
        std::cout << ptr_array[i] << " : " << *(ptr_array + i) << std::endl;
    }

    std::cout << std::endl;

    for(size_t i{}; i < size; i++) {
        std::cout << ptr_array2[i] << " : " << *(ptr_array2 + i) << std::endl;
    }

    std::cout << std::endl;

    for(size_t i{}; i < size; i++) {
        std::cout << ptr_array3[i] << " : " << *(ptr_array3 + i) << std::endl;
    }

    // releasing memory of arrays

    delete[] ptr_array;
    ptr_array = nullptr;
    delete[] ptr_array2;
    ptr_array2 = nullptr;
    delete[] ptr_array3;
    ptr_array3 = nullptr;

    return 0;
}