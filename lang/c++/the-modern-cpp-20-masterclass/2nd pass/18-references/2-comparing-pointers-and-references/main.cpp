#include <iostream>

int main()
{
    double dbl_value {34.62};
    double& ref_dbl_value {dbl_value};
    double *ptr_dbl_value {&dbl_value};

    // reference acting same as, not allowing to rewrite pointer
    // to another address
    double *const ptr_acting_as_ref {&dbl_value};

    std::cout << dbl_value << std::endl;
    std::cout << ref_dbl_value << std::endl;
    std::cout << *ptr_dbl_value << std::endl;

    std::cout << &dbl_value << std::endl;
    std::cout << &ref_dbl_value << std::endl;
    std::cout << ptr_dbl_value << std::endl;

    double another_dbl {26.16};
    ptr_dbl_value = &another_dbl;
    // cannot do sth like this with reference

    *ptr_dbl_value = 99;

    std::cout << &dbl_value << std::endl;
    std::cout << &ref_dbl_value << std::endl;
    std::cout << ptr_dbl_value << std::endl;

    return 0;
}