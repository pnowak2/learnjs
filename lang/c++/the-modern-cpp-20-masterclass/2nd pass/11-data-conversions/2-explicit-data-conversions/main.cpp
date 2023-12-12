#include <iostream>

int main()
{
    double x {12.5};
    double y {34.6};

    auto sum = static_cast<int>(x) + static_cast<int>(y);
    std::cout << "sum: " << sum << std::endl;

    // old way
    double PI {3.14};

    int int_pi = (int)PI;
    std::cout << "pi: " << int_pi;
    return 0;
}