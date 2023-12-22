#include <iostream>
#include <ctime>

int main()
{
    int loops[] {1, 2, 3, 4, 5};

    for (auto _ : loops)
    {
        int random = std::rand(); // 0 - RAND_MAX
        std::cout << random << std::endl;
    }

    std::cout << std::endl;

    std::cout << "RAND_MAX: " << RAND_MAX;

    std::cout << std::endl;

    // random number between 1-10, but always same without seed

    for (auto _ : loops)
    {
        int random_num = std::rand() % 10 + 1;
        std::cout << random_num << std::endl;
    }


    // random number between 1-10
    std::cout << std::endl;

    std::srand(std::time(0));
    for (auto _ : loops)
    {
        auto rand10 = (std::rand() % 10) + 1;
        std::cout << rand10 << std::endl;
    }
    return 0;
}