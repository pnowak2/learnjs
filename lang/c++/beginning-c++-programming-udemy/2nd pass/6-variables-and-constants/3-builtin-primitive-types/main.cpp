#include <iostream>

using namespace std;

int main() {
    char initial {'P'};
    cout << "size of char: " << sizeof(initial) << endl;;
    cout << initial << endl;
    cout << "--" << endl;

    unsigned short int score {5};
    cout << "size of unsigned short int: " << sizeof(score) << endl;
    cout << score << endl;
    cout << "--" << endl;

    int countries {2};
    cout << "size of int: " << sizeof(countries) << endl;
    cout << countries << endl;
    cout << "--" << endl;

    long people {200'000'000};
    cout << "size of long: " << sizeof(people) << endl;
    cout << people << endl;
    cout << "--" << endl;

    long long population {200'000'000'000};
    cout << "size of long long: " << sizeof(population) << endl;
    cout << population << endl;
    cout << "--" << endl;

    float payment {401.23};
    cout << "size of float: " << sizeof(payment) << endl;
    cout << payment << endl;
    cout << "--" << endl;

    double dbl {401.23};
    cout << "size of double: " << sizeof(dbl) << endl;
    cout << dbl << endl;
    cout << "--" << endl;

    long double ldbl {401.23};
    cout << "size of long double: " << sizeof(ldbl) << endl;
    cout << ldbl << endl;
    cout << "--" << endl;

    bool over {true};
    cout << "size of bool: " << sizeof(over) << endl;
    cout << over << endl;
    cout << "--" << endl;

    short val1 {30000};
    short val2 {1000};
    short sum { val1 * val2 }; // overflow
    // int sum { val1 * val2 }; // no overflow
    cout << "sum is: " << sum << endl;

    return 0;
}