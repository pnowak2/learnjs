#include <iostream>

using namespace std;

int main()
{
    int num1{0}, num2{0};

    cout << "provide two numbers: ";
    cin >> num1 >> num2;

    cout << std::boolalpha;
    cout << num1 << " > " << num2 << ": " << (num1 > num2) << endl;
    return 0;
}