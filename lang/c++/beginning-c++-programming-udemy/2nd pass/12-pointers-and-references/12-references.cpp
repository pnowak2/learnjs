#include <iostream>
#include <iomanip>
#include <cctype>
#include <cstring>
#include <math.h>
#include <vector>

using namespace std;

void simpleReferenceDeclaration() {
    int num {11};
    int &ref {num}; // reference / alias
    int *ptr {&ref}; // different from pointer!

    num = 17;

    cout << ref << endl;
    cout << &ref << endl;
    cout << &ptr << endl;
    cout << ptr << endl;
    cout << *ptr << endl;
}

void regularCopy() {
    vector<string> stooges {"Larry", "Moe", "Curly"};
    for(auto item : stooges) { // item is a copy
        item = "boo"; // changes the copy only
    }

    for(auto item : stooges) {
        cout << item << endl;
    }
}

void aliasReference() {
    // alias for variable
    vector<string> stooges {"Larry", "Moe", "Curly"};
    for(auto &item : stooges) { // &item2 -> reference, not a copy, VERY EFFICIENT, PERFORMANT!
        item = "boo"; // changes originals
    }

    for(auto item2 : stooges) {
        cout << item2 << endl;
    }
}

void constReference() {
    // alias for variable
    vector<string> stooges {"Larry", "Moe", "Curly"};
    for(auto const &item : stooges) { // &item2 -> reference, not a copy
        // item2 = "boo"; // cannot change, const reference
    }
}

int main()
{
    simpleReferenceDeclaration();
    cout << "--" << endl;
    regularCopy();
    cout << "--" << endl;
    aliasReference();
    cout << "--" << endl;
    constReference();
    cout << "--" << endl;

    return 0;
}