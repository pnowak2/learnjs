#include <iostream>

int main()
{
    int num1{2};
    int num2{7};

    int result = num1 + num2;
    result = num1 - num2;
    result = num1 * num2;
    result = num2 / num1;
    result = num2 % num1;

    std::cout << "result: " << result << std::endl;

    return 0;
}