#include <iostream>
#include <iomanip>
#include <cctype>
#include <cstring>
#include <math.h>

using namespace std;

void greet(std::string name, std::string prefix = "Mr.", std::string suffix = "");
void greet(std::string name, std::string prefix, std::string suffix) {
    cout << "Hello, " << prefix << " " + name + " " + suffix << endl;
}

double calc_cost(double base = 0, double tax = 5, double shipping = 2); 
double calc_cost(double base, double tax, double shipping) {
    return base + base * (tax / 100) + shipping;
}

int main()
{
    cout << calc_cost() << endl;
    cout << calc_cost(10) << endl;
    cout << calc_cost(10, 12) << endl;
    greet("Piotr Nowak", "Dr", "M.D.");
    greet("Frank Miller", "Dr");
    greet("James Rogers");

    return 0;
}