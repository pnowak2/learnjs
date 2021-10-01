#include <iostream>

using namespace std;

int main()
{
    int counter{10};
    int result{0};

    counter = counter + 1;
    cout << "counter: " << counter << endl;

    counter++;
    cout << "counter: " << counter << endl;

    ++counter;
    cout << "counter: " << counter << endl;

    cout << "counter: " << ++counter << endl;
    cout << "counter: " << counter++ << endl; // evaluates after expression has run!
    cout << "counter: " << counter << endl;

    return 0;
}