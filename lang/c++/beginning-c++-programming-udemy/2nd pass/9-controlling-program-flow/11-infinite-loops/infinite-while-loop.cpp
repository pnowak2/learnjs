#include <iostream>

using namespace std;

int main()
{
    while(true) {
        char c {};
        cout << "do you want to loop again ? (y/n): ";
        cin >> c;
        if(c == 'n') {
            break;
        }
    }

    return 0;
}