#include <iostream>
#include <iomanip>
#include <cctype>
#include <cstring>
#include <math.h>
#include <vector>

using namespace std;

#ifndef _ACCOUNT_H
#define _ACCOUNT_H

class Account {
private:
    string name;
    double balance;

public:
    // inline methods
    void set_balance(double b) { balance = b; }
    double get_balance() { return balance; }

    // outside, just declarations here
    void set_name(string n);
    string get_name();

    bool deposit(double amount);
    bool withdraw(double amount);
};

void Account::set_name(string n) {
    name = n;
}

string Account::get_name() {
    return name;
}

bool Account::deposit(double amount) {
    balance += amount;
    return true;
}

bool Account::withdraw(double amount) {
    if(amount <= balance) {
        balance -= amount;
        return true;
    } else {
        return false;
    }
}

#endif

int main()
{
    Account account;
    account.set_name("Piotr's account");
    account.set_balance(1000);
    account.deposit(60);

    cout << account.get_balance() << endl;

    account.withdraw(70);
    account.withdraw(2000);

    cout << account.get_balance() << endl;

    return 0;
}