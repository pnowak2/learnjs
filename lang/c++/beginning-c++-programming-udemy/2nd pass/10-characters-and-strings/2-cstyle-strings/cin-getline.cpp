#include <iostream>
#include <iomanip>
#include <cctype>
#include <cstring>

using namespace std;

int main()
{
    char full_name[50];

    cout << "Enter full name: ";
    // reads also spaces (/NULL characters included, until new line)
    cin.getline(full_name, 8);

    cout << "Your full name is " << full_name << endl;

    return 0;
}