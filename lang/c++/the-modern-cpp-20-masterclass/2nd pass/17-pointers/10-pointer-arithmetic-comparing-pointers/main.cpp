#include <iostream>

int main()
{
    int scores[] {1, 2, 3, 4, 5};
    int * score_ptr {scores};

    std::cout << std::boolalpha << std::endl;

    std::cout << ((score_ptr + 0) > (score_ptr + 1)) << std::endl;
    std::cout << ((score_ptr + 3) >= (score_ptr + 2)) << std::endl;
    std::cout << ((score_ptr + 3) != (score_ptr + 2)) << std::endl;
    std::cout << ((score_ptr + 3) == (score_ptr + 3)) << std::endl;

    return 0;
}