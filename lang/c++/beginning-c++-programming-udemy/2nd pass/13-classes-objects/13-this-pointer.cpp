#include <iostream>
#include <iomanip>
#include <cctype>
#include <cstring>
#include <math.h>
#include <vector>

using namespace std;

class Account {
private:
    string name;
    double balance;

public:
    void set_balance(double b) { this->balance = b; }
    double get_balance() { return this->balance; }

    void set_name(string n);
    string get_name();

    bool deposit(double amount);
    bool withdraw(double amount);

    int compare_balance(const Account &other);
};

void Account::set_name(string name) {
    this->name = name;
}

string Account::get_name() {
    return this->name;
}

bool Account::deposit(double amount) {
    this->balance += amount;
    return true;
}

bool Account::withdraw(double amount) {
    if(amount <= this->balance) {
        this->balance -= amount;
        return true;
    } else {
        return false;
    }
}

int Account::compare_balance(const Account &other) {
    if(this == &other) {
        cout << "same objects" << endl;
    }
}

int main()
{
    return 0;
}