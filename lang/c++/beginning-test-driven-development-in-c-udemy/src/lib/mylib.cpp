#include "mylib.h"
#include <string>
#include <cctype>
#include <cmath>
#include <stdexcept>

bool isPositive(int num) {
    return num >= 0;
}

int countPositives(std::vector<int> const& inputVector) {
    return std::count_if(inputVector.begin(), inputVector.end(), isPositive);
}

void toUpper(char *inputString) {
    for(unsigned i = 0; i < strlen(inputString); i++) {
        inputString[i] = toupper(inputString[i]);
    }
}

double mySqrt(double input) {
    if (input < 0) {
        throw std::runtime_error("Negative argument!");
    }

    return sqrt(input);
}

Account::Account() : mBalance{0} { }

void Account::deposit(double sum) {
    mBalance += sum;
}

void Account::withdraw(double sum) {
    if(mBalance < sum) {
        throw std::runtime_error("Insufficient funds");
    }

    mBalance -= sum;
}

double Account::getBalance() const {
    return mBalance;
}

void Account::transfer(Account &to, double sum) {
    withdraw(sum);
    to.deposit(sum);
}

