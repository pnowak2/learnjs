#include <iostream>
#include <vector>
#include <iomanip>

using namespace std;

int main()
{
    char response {};

    do {
        double width {};
        double height {};

        cout << "width height: ";
        cin >> width >> height;

        cout << "area is: " << width * height << endl;
        cout << "new calculation ? (y/n) ";
        cin >> response;

    } while(response == 'y');

    return 0;
}