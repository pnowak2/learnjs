#include <iostream>

using namespace std;

int main() {
    cout << "Enter your favourite number between 1 and 100: ";

    int favorite_number {};
    cin >> favorite_number;

    cout << "Your number is: ";
    cout << favorite_number << endl;

    return 0;
}