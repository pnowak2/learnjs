#include <iostream>
#include "account.h"
#include "savings-account.h"

int main(int argc, char *argv[]) {
    std::cout << "==Account==" << std::endl;
    Account acc {};
    acc.deposit(2000.0);
    acc.withdraw(500.0);

    std::cout << std::endl;

    Account *p_acc {nullptr};
    p_acc = new Account();
    p_acc->deposit(1000);
    p_acc->withdraw(500);

    delete p_acc;

    std::cout << std::endl;
    std::cout << "==Savings Account==" << std::endl;

    SavingsAccount sav_acc {};
    sav_acc.deposit(2000.0);
    sav_acc.withdraw(500.0);

    std::cout << std::endl;

    SavingsAccount *p_sav_acc {nullptr};
    p_sav_acc = new SavingsAccount();
    p_sav_acc->deposit(1000);
    p_sav_acc->withdraw(500);

    delete p_sav_acc;

    return 0;
}