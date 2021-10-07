#include <iostream>
#include <vector>
#include <iomanip>

using namespace std;

int main()
{
    size_t
    int i {1};

    while (i <= 5) {
        cout << i << endl;
        i++;
    }

    int j {0};
    int scores[] {100, 90, 87};
    while (j < 3) {
        cout << scores[j] << endl;
        j++;
    }

    return 0;
}