#include <iostream>

int main () {
    // modifiers work only on INTEGRAL types

    // 2 bytes
    short short_var {};
    short int short_int {};
    signed short signed_short {};
    signed short int signed_short_int {}; 
    unsigned short int unsigned_short_int {};

    // 4 bytes
    int int_var{};
    signed signed_var {};
    signed int signed_int {};
    unsigned int unsigned_int {};

    // 4 bytes
    long long_var {};
    long int long_int_var {};
    signed int signed_int_var {};
    signed long int signed_long_int_var {};
    unsigned long int unsigned_long_int_var {};

    // 8 bytes
    long long long_long_var {};
    long long int long_long_int_var {};
    unsigned long long int unsigned_long_long_int_var {};

    std::cout << sizeof(short) << std::endl;
    std::cout << sizeof(int) << std::endl;
    std::cout << sizeof(long) << std::endl;
    std::cout << sizeof(long long) << std::endl;
    std::cout << sizeof(long long int) << std::endl;


    return 0;
}