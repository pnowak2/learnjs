#include "mystring.hpp"

using namespace std;

int main() {
    cout << boolalpha << endl;

    MyString larry {"Larry"};
    MyString moe {"Moe"};

    MyString stooge = larry;
    larry.display();
    moe.display();

    cout << (larry == moe) << endl;
    cout << (larry == stooge) << endl;

    larry.display();
    MyString larry2 = -larry;
    larry2.display();

    MyString stooges = larry + "Moe";
    
    MyString two_stooges = moe + " " + "Larry";
    two_stooges.display();

    MyString three_stooges = moe + " " + larry + " " + "Curly";
    three_stooges.display();

    return 0;
}