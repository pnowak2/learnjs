#include <iostream>
#include <bitset>

int main()
{
    unsigned char var {0b00000000};

    const unsigned char mark_bit_0 {0b00000001};
    const unsigned char mark_bit_1 {0b00000010};
    const unsigned char mark_bit_2 {0b00000100};
    const unsigned char mark_bit_3 {0b00001000};
    const unsigned char mark_bit_4 {0b00010000};
    const unsigned char mark_bit_5 {0b00100000};
    const unsigned char mark_bit_6 {0b01000000};
    const unsigned char mark_bit_7 {0b10000000};

    std::cout << "value: " << std::bitset<8>(var) << std::endl;



    std::cout << "set bit in position 1" << std::endl;
    var |= mark_bit_1;
    std::cout << "value: " << std::bitset<8>(var) << std::endl;

    std::cout << "read bit at position 1" << std::endl;
    std::cout << "bit at position 1: " << static_cast<int>((var & mark_bit_1) >> 1) << std::endl;
    std::cout << "read bit at position 2" << std::endl;
    std::cout << "bit at position 2: " << static_cast<int>((var & mark_bit_2) >> 2) << std::endl;

    std::cout << "set bit in position 5" << std::endl;
    var |= mark_bit_5;
    std::cout << "value: " << std::bitset<8>(var) << std::endl;

    std::cout << "reset bit in position 1" << std::endl;
    var &= ~mark_bit_1;
    std::cout << "value: " << std::bitset<8>(var) << std::endl;

    std::cout << "reset bit in position 5" << std::endl;
    var &= ~mark_bit_5;
    std::cout << "value: " << std::bitset<8>(var) << std::endl;

    std::cout << "set lsb bits" << std::endl;
    var |= (mark_bit_0 | mark_bit_1 | mark_bit_2 | mark_bit_3);
    std::cout << "value: " << std::bitset<8>(var) << std::endl;

    std::cout << "reset lsb bits" << std::endl;
    var &= ~(mark_bit_0 | mark_bit_1 | mark_bit_2 | mark_bit_3);
    std::cout << "value: " << std::bitset<8>(var) << std::endl;

    return 0;
}