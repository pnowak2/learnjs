#include <iostream>
#include <iomanip>
#include <cctype>
#include <cstring>
#include <math.h>

using namespace std;

int add(int, int);
void hello(std::string name);

int add(int a, int b) {
    return a + b;
}

void hello(std::string name) {
  cout << "hello, " << name << endl;
}

// passing is by value in c++, getting copy only
void param_test(int formal) {
    cout << formal << endl;
    formal = 100;
    cout << formal << endl;
}

int main()
{
    cout << add(2, 6) << endl;
    hello("Piotr");

    int actual {50};
    cout << actual << endl;
    param_test(actual);
    cout << actual << endl;

    return 0;
}