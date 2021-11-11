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
    Player(std::string n = "None", int h = 0, int x = 0): name(n) { };

    Player(const Player &player): name(player.name) {};

    ~Player()
    {
        cout << "Desctructor called for " << name << endl;
    }

    string get_name() const
    {
        // health = 5; // not allowed, this method is const, cannot change its members
        // xp = 6;
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

void display_name(const Player &p)
{
    cout << "name is " << p.get_name() << endl;
}

int main()
{
    const Player p {"Piotr"};
    display_name (p);
    p.get_name(); // possible because method declaration has const keyword next to it
    // p.get_health(); // not declared as const, cannot call it here, as player is declared as const

    return 0;
}