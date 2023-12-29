#include <iostream>

int main()
{
    int *p_number {};
    int *p_fractional_number {};

    int *p_number1{nullptr};
    int *p_fractional_number1{nullptr};

    std::cout << "Size of pointer: " << sizeof(int *) << std::endl;
    std::cout << "Size of pointer: " << sizeof(double *) << std::endl;

    int int_var {47};
    int *ptr {&int_var};

    std::cout << "Int var: " << int_var << std::endl;
    std::cout << "int_var address: " << &int_var << std::endl;
    std::cout << "ptr address: " << ptr << std::endl;
    std::cout << "ptr value: " << *ptr << std::endl;

    // incompatibile pointers

    int *p_int {nullptr};
    double dbl_var {22.3};
    // p_int = &dbl_var; // incompatibile pointers

    return 0;
}