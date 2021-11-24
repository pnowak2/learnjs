#pragma once

#include <iostream>
#include "account.h"

class SavingsAccount : public Account {
public:
    double interest_rate;

    SavingsAccount(): interest_rate(3) { }
    ~SavingsAccount() { }

    void deposit(double amount) {
        std::cout << "Savings Account deposit with " << amount << std::endl;
    }

    void withdraw(double amount) {
        std::cout << "Savings Account withdraw with " << amount << std::endl;
    }
};