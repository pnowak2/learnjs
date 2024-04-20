#include <iostream>

int main()
{
    unsigned char unsigned_char {53u};
    long long long_var {1000'000LL};
    int hex {0x400};

    std::cout << long_var << std::endl;;
    std::cout << std::hex << std::showbase << hex << std::endl;;

    // unsigned char distance {555u}; // narrowing error, too big for unsigned char (1 byte in memory)

    return 0;
}