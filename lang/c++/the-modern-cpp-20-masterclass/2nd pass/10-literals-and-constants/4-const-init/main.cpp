#include <iostream>

const int val1{33};
constexpr int val2{34};
int val3{35};

constinit int age = 88;

const constinit int age1{val1};
constinit int age2 {age1}; // its not read only, only initialized in static environment
// constinit int age3 {val3}; // illegal

const constinit double weight {33.33};

int main()
{
    age2 = 5;
    // val2 = 6; // illegal, its read only variable
    // constinit int age = 88; // illegal, only in static thread / outside of functions
    return 0;
}