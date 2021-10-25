#include <iostream>
#include <iomanip>
#include <cctype>
#include <cstring>
#include <math.h>
#include <vector>

using namespace std;

int main()
{
    int *int_ptr {nullptr};
    int_ptr = new int;

    cout << "address " << int_ptr << endl;
    cout << "value address " << *int_ptr << endl;

    *int_ptr = 246;

    cout << "value address " << *int_ptr << endl;
    delete int_ptr;
    cout << "value address " << *int_ptr << endl;


    int *array_ptr {nullptr};
    int size {};

    array_ptr = new int[size];
    array_ptr[0] = 5;
    array_ptr[1] = 10;
    array_ptr[2] = 15;

    cout << array_ptr[0] << endl;
    cout << array_ptr[1] << endl;
    cout << array_ptr[2] << endl;

    delete [] array_ptr;

    return 0;
}