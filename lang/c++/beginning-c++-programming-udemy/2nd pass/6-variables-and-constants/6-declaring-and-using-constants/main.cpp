#include <iostream>
#include <climits>

using namespace std;

int main()
{
    const double price_per_room {32.50};
    const double tax {0.06};
    const int expiry {30};

    cout << "hello, welcome" << endl
         << endl;
    cout << "how many rooms ? ";

    unsigned int rooms{0};
    cin >> rooms;

    cout << "\nEstimate for service" << endl;
    cout << "number of rooms: " << rooms << endl;

    cout << "Price per room: $" << price_per_room << endl;
    cout << "Cost $:" << price_per_room * rooms << endl;
    cout << "Tax $" << price_per_room * rooms * tax << endl;
    cout << "__" << endl;

    cout << "Total estimate: $" << (price_per_room * rooms) + (price_per_room * rooms * tax) << endl;
    cout << "Estimate valid for " << expiry << " days";

    return 0;
}