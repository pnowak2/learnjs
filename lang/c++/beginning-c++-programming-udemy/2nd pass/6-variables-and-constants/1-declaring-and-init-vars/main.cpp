#include <iostream>

using namespace std;

int main() {
    int width {0};
    cout << "enter width: ";
    cin >> width;

    int length {0};
    cout << "enter length: ";
    cin >> length;

    cout << "area is: " << width * length << " m2";

    return 0;
}