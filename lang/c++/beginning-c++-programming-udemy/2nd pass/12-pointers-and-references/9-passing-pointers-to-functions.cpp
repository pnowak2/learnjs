#include <iostream>
#include <iomanip>
#include <cctype>
#include <cstring>
#include <math.h>
#include <vector>

using namespace std;

void double_data(int *);

void double_data(int *int_ptr) {
    *int_ptr *= 2;
}

int main()
{
    int num {6};
    int *ptr {nullptr};

    cout << num << endl;
    double_data(&num);
    cout << num << endl;

    ptr = &num;

    cout << *ptr << endl;
    double_data(ptr);
    cout << *ptr << endl;

    return 0;
}