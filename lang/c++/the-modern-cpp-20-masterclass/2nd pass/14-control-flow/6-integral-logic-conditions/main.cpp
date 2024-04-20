#include <iostream>
#include <bitset>

int main()
{
    constexpr int falsy {0};
    constexpr int truthy {-3};

    if(truthy) {
        std::cout << "truthy";
    } else {
        std::cout << "falsy";
    }

    return 0;
}