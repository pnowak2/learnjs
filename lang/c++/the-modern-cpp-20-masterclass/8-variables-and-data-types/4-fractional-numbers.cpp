#include <iostream>
#include <iomanip>

int main () {
    std::cout << sizeof(float) << std::endl;
    std::cout << sizeof(double) << std::endl;
    std::cout << sizeof(long double) << std::endl;

    double number10 {5.6};
    float number11 {};
    float number12 {};
    float number0 {5.6f};

    double result = { number10 / number11};

    std::cout << result << std::endl; // inf
    std::cout << number11 / number12 << std::endl; // nan

    std::cout << std::setprecision(3);

    double f {5.1234567};

    std::cout << f << std::endl;

    return 0;
}