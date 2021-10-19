#include <iostream>
#include <iomanip>
#include <cctype>
#include <cstring>
#include <math.h>
#include <vector>

using namespace std;

void scale_number(int &num); // & - receive reference to original variable passed by caller, not a copy anymore
void swap(int &num1, int &num2);

void scale_number(int &num) {
    if(num > 100) {
        num = 100;
    }
}

void swap(int &num1, int &num2) { // aliases, pass by reference
    const int temp = num1;
    num1 = num2;
    num2 = temp;
}

void print(const vector<string> &vect) {
    // vect = new vector<string>(); // illegal, const reference passed here
    // vect.clear(); // const, cannot do this
}

int main()
{
    int num {1000};
    scale_number(num);
    cout << num << endl;

    int num1 = 5, num2 = 10;

    cout << num1 << ", " << num2 << endl;
    swap(num1, num2);
    cout << num1 << ", " << num2 << endl;

    return 0;
}