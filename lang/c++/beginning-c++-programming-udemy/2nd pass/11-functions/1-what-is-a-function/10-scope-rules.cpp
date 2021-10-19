#include <iostream>
#include <iomanip>
#include <cctype>
#include <cstring>
#include <math.h>
#include <vector>

using namespace std;

void inline_example() {
    static int num = 5; // preserves state between function calls
    cout << "static: " << num << endl;
    num++;
}

int main()
{
    int num = 5;
    cout << num << endl;

    {
        int num = 10;
        cout << num << endl;
        num = 3;
        cout << num << endl;
    }

    cout << num << endl;

    inline_example();
    inline_example();
    inline_example();

    return 0;
}