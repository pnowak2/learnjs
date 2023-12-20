#include <iostream>

int main()
{
    size_t i {};
    const size_t COUNT {10};

    do {
        std::cout << i;
        i++;
    } while (i < COUNT);

    return 0;
}