#include <iostream>
#include <iomanip>
#include <cctype>
#include <cstring>
#include <math.h>
#include <vector>

using namespace std;

int main()
{
    int scores[] {100, 95, 89};
    cout << scores << endl;
    cout << *scores << endl;

    int *score_ptr {scores};
    cout << score_ptr << endl;
    cout << *score_ptr << endl;

    cout << score_ptr[0] << endl;
    cout << score_ptr[1] << endl;
    cout << score_ptr[2] << endl;

    cout << *(score_ptr + 0) << endl;
    cout << *(score_ptr + 1) << endl;
    cout << *(score_ptr + 2) << endl;

    return 0;
}