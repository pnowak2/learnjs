#include <iostream>
#include <iomanip>
#include <cctype>
#include <cstring>
#include <math.h>

using namespace std;

int main()
{
    int random{};
    size_t count {10};
    int min{1};
    int max{6};

    cout << "rand max: " << RAND_MAX << endl;
    srand(time(nullptr));

    for(size_t i{1}; i <= count; ++i) {
        random = rand() % (min + max);
        cout << random << endl;
    }

    cout << endl;

    return 0;
}