#include <iostream>

int main()
{
    int numbers[] {1, 2, 3};
    std::cout << "numbers[4]: " << numbers[4] << std::endl;

    // allowed, but..
    // this will mess memory managed by other parts of program and can corrupt system
    numbers[4] = 7;

    std::cout << "numbers[4]: " << numbers[4] << std::endl;

    return 0;
}