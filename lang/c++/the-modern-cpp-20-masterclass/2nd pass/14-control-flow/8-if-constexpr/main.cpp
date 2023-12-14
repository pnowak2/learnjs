#include <iostream>
#include <iomanip>

int main()
{
    constexpr bool condition { false };

    if constexpr(condition) {
        std::cout << "condition is true" << std::endl;
    } else {
        std::cout << "condition is true" << std::endl;
    }
    return 0;
}