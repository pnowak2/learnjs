#include <iostream>
#include <time>

int main()
{
    int loops[] {1, 2, 3, 4, 5};

    for (auto _ : loops)
    {
        int random = std::rand(); // 0 - RAND_MAX
        std::cout << random << std::endl;
    }

    std::cout << "RAND_MAX: " << RAND_MAX;

    // random number between 1-10

    for (auto _ : loops)
    {
        std::srand(std::time(0));
        auto rand10 = (std::rand() % 11) + 1;
        std::cout << rand10 << std::endl;
    }

    return 0;
}