#include <iostream>
#include <iomanip>

int main()
{
    char c1{'A'};
    char c2{'b'};
    char c3{'c'};
    char c4 = 65;

    std::cout << "sizeof char: " << sizeof(char) << std::endl;

    std::cout << c1 << std::endl;
    std::cout << c4 << std::endl;
    std::cout << static_cast<int>(c1) << std::endl;

    return 0;
}