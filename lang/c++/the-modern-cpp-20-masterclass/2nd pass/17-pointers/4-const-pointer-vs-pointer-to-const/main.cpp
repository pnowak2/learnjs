#include <iostream>

int main()
{
    int number {5};
    std::cout << "number: " << number << std::endl;
    std::cout << "&number: " << &number << std::endl;

    number = 12;
    number += 7;

    std::cout << "number: " << number << std::endl;
    std::cout << "&number: " << &number << std::endl;

    //---
    std::cout << std::endl;
    //---

    int *p_number1 {nullptr};
    int number1 {23};

    p_number1 = &number1;
    *p_number1 = 432;

    int number2 {56};
    p_number1 = &number2;

    //---
    std::cout << std::endl;
    //---

    int number3 {632};
    const int * p_number3 {&number3};
    // *p_number3 = 5; // illegal, because of const

    int number4 {6};
    p_number3 = &number4;

    //---
    std::cout << std::endl;
    //---

    int number5 {632};
    const int * const p_number5 {&number5};
    // *p_number3 = 5; // illegal, because of const

    int number6 {6};
    // p_number5 = &number6; // illegal, ptr cannot be modified becasue of second const

    // protected var via pointer

    int protected_var {55};
    const int * p_protected_var {&protected_var};

    protected_var = 26;
    // *p_protected_var = 72; // illegal, pointer is const

    // cannot change this pointer to point to sth else
    int * const const_ptr {&number1};
    // const_ptr = &number3; // illegal

    return 0;
}