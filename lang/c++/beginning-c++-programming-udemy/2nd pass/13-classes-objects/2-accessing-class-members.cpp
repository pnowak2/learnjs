#include <iostream>
#include <iomanip>
#include <cctype>
#include <cstring>
#include <math.h>
#include <vector>

using namespace std;

class Player
{
public:
    std::string name {""};
    int health {0};
    int xp {3};

    void talk(std::string txt) {
        cout << name << " says: " << txt << endl;
    }
    bool is_dead();
};

class Account {
public:
    std::string name { "default "};
    double balance {0};

    bool deposit(double bal) { balance += bal; return true; }
    bool withdraw(double bal) { balance -= bal; return true; }
    bool info() {
        cout << "current balance: " << balance << endl;
    }
};

int main()
{
    Player frank;
    frank.name = "Piotr";
    frank.health = 5;
    frank.xp = 12;
    frank.talk("hey");

    Player *enemy = new Player;
    (*enemy).name = "Frank";
    (*enemy).health = 180;
    enemy->xp = 15;
    enemy->talk("I'll destroy you!");

    Account acc;
    acc.info();
    acc.name = "My account";
    acc.balance = 100;
    acc.info();
    acc.deposit(20);
    acc.info();
    acc.withdraw(5);
    acc.info();

    return 0;
}