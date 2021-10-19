#include <iostream>
#include <iomanip>
#include <cctype>
#include <cstring>
#include <math.h>
#include <vector>

using namespace std;

void print_array(const int items[]/* byval/copy of pointer to array is passed*/, size_t size) {
    for (size_t i{0}; i < size; i++) {
        // items[i] = 0; // illegal, declared here as const
        cout << items[i] << ", ";
    }

    cout << endl;
}

int main()
{
    int arr[] {2, 4, 6};
    print_array(arr, 3);

    return 0;
}