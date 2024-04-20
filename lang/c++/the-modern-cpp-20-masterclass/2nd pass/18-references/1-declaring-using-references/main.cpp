#include <iostream>

int main()
{
    int int_value {42};

    int& reference_to_int_value {int_value};

    std::cout << "original: " << int_value << std::endl;
    std::cout << "reference: " << reference_to_int_value << std::endl;
    std::cout << "&original: " << &int_value << std::endl;
    std::cout << "&reference: " << &reference_to_int_value << std::endl;

    reference_to_int_value = 1;

    std::cout << "original: " << int_value << std::endl;
    std::cout << "reference: " << reference_to_int_value << std::endl;
    std::cout << "&original: " << &int_value << std::endl;
    std::cout << "&reference: " << &reference_to_int_value << std::endl;
    return 0;
}