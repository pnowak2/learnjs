#include <iostream>

using namespace std;

int main() {
    int age;

    cout << "How old are you ? ";
    cin >> age;

    if(age > 18) { // >= rather..
        cout << "Ok, you can vote";
    } else {
        cout << "Sorry, you're too young";
    }
    return 0;
}