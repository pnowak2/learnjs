#include <iostream>
#include <cmath>
#include <iomanip>

int main()
{
    double weight { 7.7 };

    std::cout << std::floor(weight) << std::endl;
    std::cout << std::ceil(weight) << std::endl;

    std::cout << std::abs(-5) << std::endl;

    std::cout <<std::setprecision(20) << std::exp(1) << std::endl;

    std::cout << std::pow(2, 3) << std::endl;

    std::cout << std::log(3.14) << std::endl;
    std::cout << std::log10(10000) << std::endl;

    std::cout << std::sqrt(9) << std::endl;

    std::cout << std::round(9.49) << std::endl;
    std::cout << std::round(9.51) << std::endl;

    const auto PI = 3.1428;
    std::cout << std::sin(PI/2) << std::endl;
    std::cout << std::cos(PI/2) << std::endl;
    return 0;
}