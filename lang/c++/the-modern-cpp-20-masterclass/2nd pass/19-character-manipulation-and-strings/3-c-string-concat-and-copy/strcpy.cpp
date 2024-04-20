#include <iostream>
#include <cstring>

int main()
{
    char dest[50]{""};
    char src[50]{"World!"};

    // copies src to destination
    std::strcpy(dest, src);
    std::cout << dest << std::endl;

    //-- copies only n chars to destination

    char dest2[50]{""};
    char src2[50]{"World!"};
    std::strncpy(dest2, src2, 3);
    std::cout << dest2 << std::endl;

    return 0;
}