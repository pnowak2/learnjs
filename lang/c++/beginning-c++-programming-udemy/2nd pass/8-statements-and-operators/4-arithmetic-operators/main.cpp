#include <iostream>

using namespace std;

int main() {
    int num1 {10};
    int num2 {20};

    cout << num1 << " + " << num2 << " = " << num1 + num2 << endl;
    cout << num1 << " * " << num2 << " = " << num1 * num2 << endl;

    cout << num1 << " / " << num2 << " = " << num1 / num2 << endl;
    double division = (double)num1 / (double)num2;
    cout << num1 << " / " << num2 << " = " << division << endl;


    cout << num1 << " % " << num2 << " = " << num1 % num2 << endl;
    cout << num2 << " % " << num1 << " = " << num2 % num1 << endl;

    cout << endl;

    return 0;
}