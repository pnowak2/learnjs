#include <iostream>
#include <vector>
#include <iomanip>

using namespace std;

int main()
{
    for (int i {0}; i < 10; i++) {
        for (int j {0}; j < 10; j++) {
            cout << i * j << endl;
        }
    }

    vector<vector<int>> vector_2d {
        {1, 2, 3},
        {10, 20, 30},
        {100, 200, 300},
    };

    for(auto v : vector_2d) {
        for(auto val : v) {
            cout << val << endl;
        }
    }

    return 0;
}