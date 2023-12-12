#include <iostream>

int main()
{
    // overflow
    unsigned char char_var {55};

    unsigned char val1 {130};
    unsigned char val2 {131};

    char_var = val1 + val2;

    std::cout << "size: " << sizeof(char_var) << std::endl;
    std::cout << "sum: " << static_cast<int>(char_var) << std::endl;

    // underflow
    unsigned char char_var2 {55};

    unsigned char val3 {130};
    unsigned char val4 {131};

    char_var2 = val3 - val4;

    std::cout << "size: " << sizeof(char_var2) << std::endl;
    std::cout << "sum: " << static_cast<int>(char_var2);
    return 0;
}