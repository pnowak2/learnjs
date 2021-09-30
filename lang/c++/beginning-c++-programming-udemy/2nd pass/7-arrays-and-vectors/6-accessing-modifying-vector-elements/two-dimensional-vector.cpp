#include <iostream>
#include <vector>

using namespace std;

int main()
{
    vector<vector<int>> scores {
        {0, 1, 2},
        {3, 4, 5},
        {6, 7, 8},
    };

    cout << scores[1][2] << endl;
    cout << scores.at(1).at(2);
}