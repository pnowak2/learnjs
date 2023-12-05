#include <iostream>
#include <iomanip>

int main()
{
    float number1{1.12345678901234567890f};
    double number2{1.12345678901234567890}; // without suffix its double precision
    long double number3{1.12345678901234567890L};

    std::cout << "sizeof float: " << sizeof(float) << std::endl;
    std::cout << "sizeof double: " << sizeof(double) << std::endl;
    std::cout << "sizeof long double: " << sizeof(long double) << std::endl;

    std::cout << std::setprecision(20);
    std::cout << "number1 is: " << number1 << std::endl;
    std::cout << "number2 is: " << number2 << std::endl;
    std::cout << "number3 is: " << number3 << std::endl;

    // float number4 {192400023}; // narrowing error. Too big to have 7 digits in front of decimal point
    double number5(192400023);
    double number6(1.924e8);

    double number10{5.6};
    double number11{}; // init to zero

    double result{number10 / number11};

    std::cout << "Division by zero: " << result << std::endl;
    std::cout << "Division zero by zero: " << number11 / number11 << std::endl;
}