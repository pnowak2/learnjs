#include <iostream>
#include <iomanip>
#include <cctype>
#include <cstring>
#include <math.h>
#include <vector>

using namespace std;

class Player
{
    std::string name {""};
    int health {0};
    int xp {3};

public:
    void talk(std::string);
    bool is_dead();
};

void Player::talk(std::string text)
{
    cout << "howdy, " << text << endl;
}

class Account {
    std::string name { "default "};
    double balance {0};

    bool deposit(double);
    bool withdraw(double);
};

int main()
{
    Player frank;
    Player hero;
    Player &held{hero};
    Player *enemy = new Player();
    Player players[]{frank, hero};
    vector<Player> vplayers{held};

    vplayers.push_back(*enemy);

    delete enemy;

    frank.talk("hi");
    hero.talk("yo");
    (*enemy).talk("see ya");
    enemy->talk("maaan");
    held.talk("jaaa");

    for (auto p : players)
    {
        p.talk("from for");
    }

    for (auto p : vplayers)
    {
        p.talk("from vector");
    }

    Account frankAcc;

    return 0;
}