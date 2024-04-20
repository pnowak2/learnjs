#include <iostream>

int main()
{
    int value{5};

    std::cout << "Value: " << value << std::endl;
    value +=5;
    value *=5;
    value /=5;
    value -=5;
    value %=5;

    std::cout << "Value: " << value << std::endl;

    return 0;
}