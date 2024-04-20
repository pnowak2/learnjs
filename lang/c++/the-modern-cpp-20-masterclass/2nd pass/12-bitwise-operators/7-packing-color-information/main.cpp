#include <iostream>
#include <bitset>

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