#include <iostream>
#include <iomanip>
#include <cctype>
#include <cstring>
#include <math.h>

using namespace std;

int main()
{
    int num {10};
    cout << "Value of num is: " << num << endl;
    cout << "Size of num is: " << sizeof num << endl;
    cout << "Address of num is: " << &num << endl;

    int *p;
    cout << "Value of p is: " << p << endl;
    cout << "Size of p is: " << sizeof p << endl;
    cout << "Address of p is: " << &p << endl;

    p = nullptr;
    cout << "Value of p is: " << p << endl;

    int score {10};
    int *score_ptr {nullptr};
    score_ptr = &score;

    cout << "Value of score pointer is: " << score_ptr << endl;
    cout << "Dereference Value of score pointer is: " << *score_ptr << endl;
    cout << "Size of score pointer  is: " << sizeof score_ptr << endl;
    cout << "Address of score pointer is: " << &score_ptr << endl;

    return 0;
}