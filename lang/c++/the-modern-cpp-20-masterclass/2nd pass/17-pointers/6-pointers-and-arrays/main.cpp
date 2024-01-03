#include <iostream>

int main()
{
    int scores[] {1, 2, 3};
    int * p_score {scores};

    std::cout << "scores: " << scores << std::endl;
    std::cout << "p_score: " << p_score << std::endl;
    std::cout << "*scores: " << *scores << std::endl;
    std::cout << "scores[0]: " << scores[0] << std::endl;
    std::cout << "*p_score: " << *p_score << std::endl;
    std::cout << "p_score[0]: " << p_score[0] << std::endl;
    std::cout << "p_score[2]: " << p_score[2] << std::endl;

    int number { 2 };

    // scores = &number; // cannot assign array to other place
    p_score = &number;

    std::cout << "score size: " << std::size(scores) << std::endl;
    // std::cout << "p_score size: " << std::size(p_score) << std::endl; // illegal with pointers

    return 0;
}