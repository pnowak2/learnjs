#include <iostream>
#include <bitset>

const unsigned char mark_bit_0{0b00000001};
const unsigned char mark_bit_1{0b00000010};
const unsigned char mark_bit_2{0b00000100};
const unsigned char mark_bit_3{0b00001000};
const unsigned char mark_bit_4{0b00010000};
const unsigned char mark_bit_5{0b00100000};
const unsigned char mark_bit_6{0b01000000};
const unsigned char mark_bit_7{0b10000000};


int main()
{
    const unsigned int red_mask {0xff000000};
    const unsigned int green_mask {0x00ff0000};
    const unsigned int blue_mask {0x0000ff00};
    const unsigned int alpha_mask {0x0000ff00};

    unsigned int  color {0xaabcde10};

    std::cout << std::hex << std::showbase << std::endl;

    std::cout << std::bitset<32>(color) << std::endl;
    std::cout << std::bitset<32>(color & red_mask) << std::endl;
    std::cout << ((color & red_mask) >> 24) << std::endl;

    return 0;
}