#include <iostream>
#include <vector>

using namespace std;

int main()
{
    for (int i = 0; i < 3; i++) {
        cout << i << endl;
    }

    cout << "==" << endl;

    for (int i {1}; i < 3; i++) {
        cout << i << endl;
    }

    cout << "==" << endl;

    for (int i {1}, j{5}; i < 3; i++, j+=2) {
        cout << i << j << endl;
    }

    cout << "==" << endl;

    for (int i {1}; i<=20; ++i) {
        if (i % 10 == 0) {
            cout << i << endl;
        } else {
            cout << "-" << endl;
        }
    }

    cout << "==" << endl;

    vector<string> w = {"a", "b"};
    for(int i{0}; i < w.size(); i++)  {
        cout << w.at(i) << endl;
    }

    cout << "==" << endl;

    vector<string> v = {"a", "b"};
    for(auto item : v)  {
        cout << item << endl;
    }


    return 0;
}