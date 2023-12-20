#include <iostream>

int main()
{
    int scores[10];

    scores[0] = 1;
    scores[1] = 2;
    scores[2] = 3;

    for(size_t i {0}; i < 10; i++) {
        std::cout << scores[i] << std::endl;
    }

    std::cout << scores[10] << std::endl; // out of bounds!

    for(size_t i {0}; i < 10; i++) {
        scores[i] = i * 2;
    }

    for(size_t i {0}; i < 10; i++) {
        std::cout << scores[i] << std::endl;
    }

    //---

    double salaries [10] {12.7, 7.5, 13.2, 8.1, 9.3 /* rest are zeros*/};
    for(size_t i {0}; i < 10; i++) {
        std::cout << salaries[i] << std::endl;
    }

    int sizes[] { 10, 20, 30, 40, 50, 60};
    for(auto size: sizes) {
        std::cout << size << std::endl;
    }

    // const arrays

    const int multipliers[] {1, 2, 3};
    // multipliers[0] = 2; // illegal, constant array

    // operations
    int sum {};
    for(auto score : scores) {
        sum += score;
    }

    std::cout << "Sum: " << sum << std::endl;

    return 0;
}