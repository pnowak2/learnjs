#include "account.hpp"

void Account::set_balance(double b) { balance = b; }
double Account::get_balance() { return balance; }

void Account::set_name(std::string n) {
    name = n;
}

std::string Account::get_name() {
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
