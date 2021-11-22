#include "mystring.hpp"

using namespace std;

int main() {
    cout << boolalpha << endl;

    MyString larry {"Larry"};
    MyString foo {"Foo"};
    MyString larry2 = -larry;

    larry.display();
    larry2.display();

    MyString moe = larry + foo;
    moe.display();

    return 0;
}