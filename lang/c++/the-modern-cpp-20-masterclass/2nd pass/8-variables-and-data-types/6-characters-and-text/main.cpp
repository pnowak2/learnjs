#include <iostream>
#include <iomanip>

int main()
{
    char value = 65;
    std::cout << "value: " << value << std::endl;
    std::cout << "value(int): " << static_cast<int>(value) << std::endl;

    value = 'B';
    std::cout << "value: " << value << std::endl;

    char valueC {'a'};
    std::cout << "valueC: " << int(valueC) << std::endl;
    std::cout << "size of char: " << sizeof(char) << std::endl;

    return 0;
}