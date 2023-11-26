#include <iostream>

int main()
{
    int num1 = 7;
    int num2 = 5;

    std::cout << "Value: " << (num1 > num2) << std::endl;
    std::cout << "Value: " << (num1 < num2) << std::endl;
    std::cout << "Value: " << (num1 == num2) << std::endl;
    std::cout << "Value: " << (num1 != num2) << std::endl;
    std::cout << "Value: " << (num1 <= num2) << std::endl;
    std::cout << "Value: " << (num1 >= num2) << std::endl;

    return 0;
}