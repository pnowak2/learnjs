#include <iostream>
#include <bitset>

int main()
{
    unsigned char value1 {0x3}; // 0000 0011
    unsigned char value2 {0x5}; // 0000 0101

    auto andOp = static_cast<unsigned char>(value1 & value2);
    auto orOp = static_cast<unsigned char>(value1 | value2);
    auto xorOp = static_cast<unsigned char>(value1 ^ value2);

    std::cout << std::bitset<8>(andOp) << std::endl;
    std::cout << std::bitset<8>(orOp) << std::endl;
    std::cout << std::bitset<8>(xorOp) << std::endl;
    std::cout << std::bitset<8>(~orOp) << std::endl;

    return 0;
}