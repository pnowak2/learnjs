#include <iostream>
#include <iomanip>
#include <cctype>
#include <cstring>
#include <math.h>
#include <vector>

using namespace std;

int main()
{
    int high_score{100};
    int low_score{5};

    /*
     * pointer to constants
     */
    const int *const_score_ptr {&high_score};
    int *score_ptr{&high_score};

    *score_ptr = 20;
    const_score_ptr = &low_score; // can point to another variable
    // *const_score_ptr = 20; // cannot modify data pointed by this pointer
    // *const_score_ptr = 8; // cannot modify data pointed by this pointer

    /*
     * const pointer to constants
     */
    const int *const ptr {&high_score};
    int *const ptr2 {&high_score};
    // ptr = &low_score; // illegal
    // *ptr = 20; // illegal
    // ptr2 = &low_score; // illegal
    *ptr2 = 20; // no problem

    return 0;
}