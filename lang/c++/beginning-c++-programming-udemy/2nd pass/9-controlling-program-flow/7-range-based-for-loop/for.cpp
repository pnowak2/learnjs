#include <iostream>
#include <vector>
#include <iomanip>

using namespace std;

int main()
{
    vector<string> v = {"a", "b"};
    for (string item : v)
    {
        cout << item << endl;
    }

    cout << "==" << endl;

    int scores[]{1, 2, 3};
    for (auto item : scores)
    {
        cout << item << endl;
    }

    cout << "==" << endl;

    string str = "Piotr";
    for (auto letter : str)
    {
        cout << letter << ".";
    }

    cout << endl;
    cout << "==" << endl;

    double numbers[]{13.2, 16.4};
    cout << fixed << setprecision(2);
    for (auto item : numbers)
    {
        cout << item << endl;
    }

    cout << endl;
    cout << "==" << endl;

    for (auto c : "test of string")
    {
        if (c !=' ')
            cout << c;
    }

    return 0;
}