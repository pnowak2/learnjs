#include <iostream>

using namespace std;

int main() {
    bool equal_result {false};
    bool not_equal_result {false};

    int num1{0}, num2{0};

    cout << "Enter two ints: ";
    cin >> num1 >> num2;

    equal_result = (num1 == num2);
    not_equal_result = (num1 != num2);

    cout << "Comparison result (equals): " << equal_result << endl;
    cout << "Comparison result (not equals): " << not_equal_result << endl;

    cout << "Comparison result (equals): " << boolalpha << equal_result << endl;
    cout << "Comparison result (not equals): " << boolalpha << not_equal_result << endl;

    return 0;
}