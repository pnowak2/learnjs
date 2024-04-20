#include <iostream>
#include <iomanip>

int main()
{
    int num1{5};
    int num2{2};

    std::cout << std::boolalpha;

    std::cout << (num1 > num2) << std::endl;
    std::cout << (num1 >= num2) << std::endl;
    std::cout << (num1 < num2) << std::endl;
    std::cout << (num1 <= num2) << std::endl;
    std::cout << (num1 != num2) << std::endl;
    std::cout << (num1 == num2) << std::endl;

    return 0;
}