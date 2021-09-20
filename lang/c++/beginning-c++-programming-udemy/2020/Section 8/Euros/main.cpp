#include <iostream>

using namespace std;

int main() {
    const double usdPerEur {1.19};
    
    cout << "Welcome to the EUR to USD converter" << endl;
    cout << "Enter the value in EUR: ";
    
    double euros {0.0};
    double dollars {0.0};
    
    cin >> euros;
    
    dollars = euros * usdPerEur;
    
    cout << euros << "EUR  is equivalent to " << dollars << "$" << endl;

    return 0;
}
