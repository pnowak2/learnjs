#include <iostream>

using namespace std;

int main()
{
    int num{};
    const int min{10};
    const int max{100};

    cout << "enter number between " << min << " and " << max << ": ";

    cin >> num;

    if (num >= min)
    {
        cout << num << " is greather than " << min << endl;

        int diff {num - min};
        cout << num << " is " << diff << " greather than " << min << endl;
    }

    if (num <= max)
    {
        cout << num << " is less than " << max << endl;

        int diff {max - num};
        cout << num << " is " << diff << " less than " << max << endl;
    }

    if (num >= min && num <= max) {
        cout << num << " is in range" << endl;
    }

    cout << endl;

    return 0;
}