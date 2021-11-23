#include "mystring.hpp"

using namespace std;

int main() {
    MyString larry {"Larry"};

    cout << "hello " << larry << endl;

    cin >> larry;

    larry.display();

    return 0;
}