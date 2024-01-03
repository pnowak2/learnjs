#include <iostream>

int main()
{
    int scores[]{1, 2, 3, 4, 5};
    int * p_score {scores};

    std::cout << p_score << std::endl;
    std::cout << *p_score << std::endl;
    p_score++;
    std::cout << p_score << std::endl;
    std::cout << *p_score << std::endl;
    p_score++;
    std::cout << p_score << std::endl;
    std::cout << *p_score << std::endl;
    p_score++;
    std::cout << p_score << std::endl;
    std::cout << *p_score << std::endl;
    p_score++;
    std::cout << p_score << std::endl;
    std::cout << *p_score << std::endl;

    for(size_t i {0}; i < std::size(scores); i++) {
        std::cout << *(scores + i) << std::endl;
        *(scores + i) *= 2;
    }

    for(size_t i {0}; i < std::size(scores); i++) {
        std::cout << *(scores + i) << std::endl;
    }

    return 0;
}