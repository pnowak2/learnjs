#include "mystring.hpp"

using namespace std;

int main() {
    MyString a("Larry");
    MyString b;

    a.display();
    b.display();

    b = a;

    a.display();
    b.display();

    b = "hello";
    b.display();

    return 0;
}