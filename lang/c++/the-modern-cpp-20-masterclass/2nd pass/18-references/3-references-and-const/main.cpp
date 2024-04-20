#include <iostream>

int main()
{
    int age {27};
    const int &ref_age {age};

    // ref_age = 5; // illegal, const

    // its similar as const, const pointer

    int const * const ref_age {&age};
    // both are const, thus illegal are following statements:
    // ref_age = &age;
    // ref_age = 6;

    return 0;
}