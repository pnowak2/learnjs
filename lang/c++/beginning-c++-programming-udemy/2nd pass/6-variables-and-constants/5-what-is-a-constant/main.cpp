#include <iostream>
#include <climits>

using namespace std;

int main() {
    cout << "size of INT_MAX: " << sizeof(INT_MAX) << endl;;
    cout << "CHAR MAX: " << CHAR_MAX << endl;
    cout << "CHAR MIN: " << CHAR_MIN << endl;
    cout << "INT MAX: " << INT_MAX << endl;
    cout << "INT MIN: " << INT_MIN << endl;
    cout << "LONG MAX: " << LONG_MAX << endl;
    cout << "LONG MIN: " << LONG_MIN << endl;
    cout << "LLONG MAX: " << LLONG_MAX << endl;
    cout << "LLONG MIN: " << LLONG_MIN << endl;
    cout << "DBL MAX: " << __DBL_MAX__ << endl;
    cout << "DBL MIN: " << __DBL_MIN__ << endl;
    cout << "--" << endl;

    cout << "size of char: " << sizeof(char) << endl;;
    cout << "--" << endl;

    cout << "size of unsigned short int: " << sizeof(unsigned short int) << endl;
    cout << "--" << endl;

    int countries {2};
    cout << "size of int: " << sizeof(int) << endl;
    cout << "--" << endl;

    cout << "size of long: " << sizeof(long) << endl;
    cout << "--" << endl;

    cout << "size of long long: " << sizeof(long long) << endl;
    cout << "--" << endl;

    cout << "size of float: " << sizeof(float) << endl;
    cout << "--" << endl;

    cout << "size of double: " << sizeof(double) << endl;
    cout << "--" << endl;

    cout << "size of long double: " << sizeof(long double) << endl;
    cout << "--" << endl;

    cout << "size of bool: " << sizeof(bool) << endl;
    cout << "--" << endl;

    return 0;
}