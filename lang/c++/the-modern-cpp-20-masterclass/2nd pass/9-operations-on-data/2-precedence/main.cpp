#include <iostream>

int main()
{
    int a{1};
    int b{2};
    int c{3};
    int d{10};
    int e{5};
    int f{6};
    int g{7};


    std::cout << (a + b * c - d / e - f + g) << std::endl;
    std::cout << (float)a / (float)b * (float)c;
    return 0;
}