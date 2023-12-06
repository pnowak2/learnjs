#include <iostream>

int main()
{
    int number1{2};
    int number2{3};

    int sum{number1 + number2};
    int mul{number1 * number2};
    int sub{number1 - number2};
    int mod{number2 % number1};
    float div{(float)number2 / (float)number1};

    std::cout << "Sum: " << sum << std::endl;
    std::cout << "Multiplication: " << mul << std::endl;
    std::cout << "Subsctraction" << sub << std::endl;
    std::cout << "Division: " << div << std::endl;
    std::cout << "Modulo: " << mod << std::endl;

    return 0;
}