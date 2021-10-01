#include <iostream>

using namespace std;

int main() {
    int num1 {10};
    int num2 {20};

    num1 = 100;
    num1 = num2; // lvalue vs rvalue, addess vs actual value
    num1 = num2 = 1000; // num1 = (num2 = 1000)
    // 100 = num1; // 100 does not have lvalue, its a literal

    cout << "num1 is " << num1 << endl;
    cout << "num2 is " << num2 << endl;

    cout << endl;

    return 0;
}