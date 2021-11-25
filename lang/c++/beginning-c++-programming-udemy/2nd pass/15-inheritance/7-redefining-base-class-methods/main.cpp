#include <iostream>

using namespace std;

class Account {
private:
    static constexpr const double INITIAL_BALANCE {0};
    static constexpr const char *name = "Account";

protected:
    double balance {0};

public:
    Account(double bal = Account::INITIAL_BALANCE): balance{bal} {}

    void deposit(double amount) { balance += amount; }

    void display() {
        cout << "Balance: " << balance << endl;
    }
};

class SavingsAccount: public Account {
private:
    float interest {0.01};
public:
    SavingsAccount(double amount): Account(amount) {}

    void deposit(double amount) {
        Account::deposit(amount); // calling base class deposit method
        balance = balance * (1 + interest);
    }
};

int main(int argc, char *argv[]) {
    Account acc {100};
    acc.display();
    acc.deposit(5);
    acc.display();

    SavingsAccount sav {200};
    sav.display();
    sav.deposit(17);
    sav.display();


    return 0;
}