#include "mystring.hpp"

using namespace std;

int main() {
    MyString empty;
    MyString larry("Larry");
    MyString stooge {larry};

    empty.display();
    larry.display();
    stooge.display();

    return 0;
}