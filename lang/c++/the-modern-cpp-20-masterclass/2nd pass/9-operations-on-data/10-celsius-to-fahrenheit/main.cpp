#include <iostream>
#include <limits>

int main()
{
    float celsius {};
    std::cout << "Celsius value: ";
    std::cin >> celsius;

    auto fahrenheit = (9.0 / 5) * celsius + 32;

    std::cout << std::endl;
    std::cout << celsius << " is " << fahrenheit << std::endl;

    return 0;
}