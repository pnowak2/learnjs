#include <iostream>
#include <cstring>

int main()
{
    char dest[50]{"Hello "};
    char src[50]{"World!"};

    // joins two strings, need to have dst array big enough
    std::strcat(dest, src);

    std::cout << dest << std::endl;

    // --

    char *dest1 = new char[]{'h', 'e', 'l', 'l', 'o', '\0'};
    char *src1 = new char[20] {' ', 'm', 'a', 'n', '\0'};

    std::cout << "strlen: " << std::strlen(dest1) << ", " << std::strlen(src1) << std::endl;
    std::strcat(dest1, src1);
    std::cout << dest1 << std::endl;

    // --

    char dest2[50]{"Hello "};
    char src2[50]{"World!"};

    // joins two strings with only n chars, need to have dst array big enough
    std::strncat(dest2, src2, 3);

    std::cout << dest2 << std::endl;

    return 0;
}