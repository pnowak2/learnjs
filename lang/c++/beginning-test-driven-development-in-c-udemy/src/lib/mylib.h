#include <vector>

int countPositives(std::vector<int> const& inputVector);
bool isPositive(int num);
void toUpper(char *inputString);
double mySqrt(double input);

class Account {
  public:
    Account();
    void deposit(double sum);
    void withdraw(double sum);
    double getBalance() const;
    void transfer(Account& to, double sum);
  
  private:
    double mBalance;
};