#include <iostream>

int main()
{
    size_t sum {0};
    const size_t start {0};
    const size_t stop {99};

    for(size_t i = start; i <= stop; i++) {
        sum += i;
    }

    std::cout << "Total sum is: " << sum;

    return 0;
}