#include <iostream>
#include <iomanip>
#include <cctype>
#include <cstring>
#include <math.h>
#include <vector>

using namespace std;

int *largest_int(int *ptr1, int *ptr2) {
    if(*ptr1 > *ptr2) {
        return ptr1;
    } else {
        return ptr2;
    }
}

int *make_array(size_t size, int initValue = 0) {
    int *arr = new int[size];
    for(size_t i{0}; i < size; i++) {
        *(arr + i) = initValue;
    }

    return arr;
}

void display(const int *const arr) {
    int size = sizeof(*arr) / sizeof(arr[0]);
    cout << "size: " << size << endl;

    for(size_t i{0}; i < size; i++) {
        cout << arr[i] << endl;
    }
}

int main()
{
    int num1 {10}, num2 {20};
    int *result = largest_int(&num1, &num2);
    cout << *result << endl;

    int *arr = make_array(10, 2);
    display(arr);

    delete [] arr;

    return 0;
}