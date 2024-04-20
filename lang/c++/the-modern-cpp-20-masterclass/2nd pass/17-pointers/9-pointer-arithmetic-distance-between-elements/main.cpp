#include <iostream>

int main()
{
    int scores[] {1, 2, 3, 4, 5};
    int * score_ptr {scores};
    std::ptrdiff_t ptr_difference = (score_ptr + 4) - (score_ptr);

    std::cout << ptr_difference << std::endl;
    std::cout << sizeof(std::ptrdiff_t) << std::endl;
    std::cout << (score_ptr + 4) - (score_ptr) << std::endl;

    return 0;
}