#include <iostream>

const unsigned char mark_bit_0{0b00000001};
const unsigned char mark_bit_1{0b00000010};
const unsigned char mark_bit_2{0b00000100};
const unsigned char mark_bit_3{0b00001000};
const unsigned char mark_bit_4{0b00010000};
const unsigned char mark_bit_5{0b00100000};
const unsigned char mark_bit_6{0b01000000};
const unsigned char mark_bit_7{0b10000000};

void use_options_v1(unsigned char flags)
{
    std::cout << "bit 0 is: " << ((flags & mark_bit_0) >> 0) << std::endl;
    std::cout << "bit 1 is: " << ((flags & mark_bit_1) >> 1) << std::endl;
    std::cout << "bit 2 is: " << ((flags & mark_bit_2) >> 2) << std::endl;
    std::cout << "bit 3 is: " << ((flags & mark_bit_3) >> 3) << std::endl;
    std::cout << "bit 4 is: " << ((flags & mark_bit_4) >> 4) << std::endl;
    std::cout << "bit 5 is: " << ((flags & mark_bit_5) >> 5) << std::endl;
    std::cout << "bit 6 is: " << ((flags & mark_bit_6) >> 6) << std::endl;
    std::cout << "bit 7 is: " << ((flags & mark_bit_7) >> 7) << std::endl;
}

int main()
{
    use_options_v1(0b01011010);
    use_options_v1(mark_bit_0 | mark_bit_1 | mark_bit_2);

    return 0;
}