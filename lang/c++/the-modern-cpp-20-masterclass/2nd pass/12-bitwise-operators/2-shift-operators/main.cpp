#include <iostream>
#include <bitset>

int main()
{
    unsigned short int value {0xff0u};
    std::cout << "value: " << std::bitset<16>(value) << std::endl;

    std::cout << "Shifting right.." << std::endl;
    value = value >> 1;
    std::cout << "value: " << std::bitset<16>(value) << std::endl;

    std::cout << "Shifting left.." << std::endl;
    value = value << 9;
    std::cout << "value: " << std::bitset<16>(value) << std::endl;

    return 0;
}