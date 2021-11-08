#include <iostream>
#include <iomanip>
#include <cctype>
#include <cstring>
#include <math.h>
#include <vector>

using namespace std;

class Player
{
private:
    std::string name{""};
    int health{0};
    int xp{3};

public:
    Player(const Player &player);
    Player(std::string n = "None", int h = 0, int x = 0);

    string get_name()
    {
        return name;
    }

    int get_health()
    {
        return health;
    }

    int get_xp()
    {
        return xp;
    }
};

Player::Player( std::string n, int h, int x) : name{n}, health{h}, xp{x} {
    cout << "Three args constructor for " + name << endl;
}

Player::Player(const Player &source): name(source.name), health(source.health), xp(source.xp) {
    cout << "copy constructor for " + name << endl;
}

int main()
{
    Player empty;
    Player chris{"Chris"};
    Player andy{"Andy", 7};
    Player piotr{"Piotr", 100, 10};

    Player copied{empty};

    cout << empty.get_name() << endl;
    cout << chris.get_name() << endl;
    cout << andy.get_name() << endl;
    cout << piotr.get_name() << endl;

    return 0;
}