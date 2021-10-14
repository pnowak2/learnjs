#include <iostream>
#include <iomanip>
#include <cctype>

using namespace std;

int main()
{
    cout << boolalpha << "is lower case: " << islower('a') << endl;
    cout << "is upper case: " << isupper('A') << endl;
    cout << "is digit: " << isdigit('5') << endl;
    cout << "is alpha: " << isalpha('a') << endl;
    cout << "is num or letter: " << isalnum('#') << endl;
    cout << "is printable character: " << isprint('#') << endl;
    cout << "is punctuation character: " << ispunct('.') << endl;
    cout << "is white space: " << isspace(' ') << endl;

    cout << "to lower: " << (char)tolower('A') << endl;
    cout << "to upper: " << static_cast<char>(toupper('b')) << endl;

    return 0;
}