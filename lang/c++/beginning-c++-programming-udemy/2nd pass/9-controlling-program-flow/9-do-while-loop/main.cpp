#include <iostream>
#include <vector>
#include <iomanip>

using namespace std;

int main()
{
    for(auto c : "hello") {
        if (c != 'o') {
            cout << c;
            continue;
        } else {
            break;
        }
    }
    return 0;
}