#include <iostream>

using namespace std;

int main() {
    int rows {3};
    int cols {4};

    int arr[rows][cols];

    arr[0][0] = 10;
    arr[0][1] = 11;
    arr[0][2] = 12;

    cout << arr[0][0] << endl;
    cout << arr[0][1] << endl;
    cout << arr[0][2] << endl;
}