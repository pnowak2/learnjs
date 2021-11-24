#pragma once

#include <iostream>

class Account {
    std::string name;
    double balance;
public:

    Account(): balance{0.0}, name{"An Account"} { }
    ~Account() { }

    void deposit(double amount) {
        std::cout << "Account deposit with " << amount << std::endl;
    }

    void withdraw(double amount) {
        std::cout << "Account withdraw with " << amount << std::endl;
    }
};