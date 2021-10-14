#include <iostream>
#include <iomanip>
#include <cctype>
#include <cstring>
#include <math.h>

using namespace std;

double area_circle(double radius) {
    return 3.14 * radius * radius;
}

int main()
{
    double radius {};
    cout << "whats r: ";
    cin >> radius;

    double area = area_circle(radius);

    cout << "circle area is: " << area << endl;

    return 0;
}