#include <iostream>
#include <iomanip>

int main()
{
    bool a {true};
    bool b {false};
    bool c {true};
    bool d {!c};

    std::cout << std::boolalpha;

    std::cout << (a && b) << std::endl;
    std::cout << (a && c) << std::endl;
    std::cout << (a && b && c) << std::endl;

    std::cout << (a || b) << std::endl;
    std::cout << (a || c) << std::endl;
    std::cout << (a || b || c) << std::endl;

    std::cout << ((a && b) || c) << std::endl;
    std::cout << (d) << std::endl;

    return 0;
}