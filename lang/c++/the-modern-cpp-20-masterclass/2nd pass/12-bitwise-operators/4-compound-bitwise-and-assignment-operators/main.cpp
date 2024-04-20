#include <iostream>
#include <bitset>

int main()
{
    unsigned short int var {0b00110100};

    std::cout << "original: " << std::bitset<8>(var) << std::endl;

    var <<= 2;
    std::cout << "<<=2: " << std::bitset<8>(var) << std::endl;

    var >>= 2;
    std::cout << ">>=2: " << std::bitset<8>(var) << std::endl;

    var &= 0b00001111;
    std::cout << "&= 0b00001111: " << std::bitset<8>(var) << std::endl;

    var ^= 0b00001111;
    std::cout << "^= 0b00001111: " << std::bitset<8>(var) << std::endl;

    var |= 0b11110000;
    std::cout << "|= 0b11110000: " << std::bitset<8>(var) << std::endl;

    return 0;
}