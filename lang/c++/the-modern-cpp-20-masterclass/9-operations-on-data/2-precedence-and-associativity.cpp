#include <iostream>

int main()
{
    int a {6};
    int b {6};
    int c {6};
    int d {6};
    int e {6};
    int f {6};
    int g {6};

    int result = a + b * c - d/e - f + g;
    int result2 = a + (b * c) - d/e - (f + g);

    std::cout << result << std::endl; // 41
    std::cout << result2; // 29

    return 0;
}