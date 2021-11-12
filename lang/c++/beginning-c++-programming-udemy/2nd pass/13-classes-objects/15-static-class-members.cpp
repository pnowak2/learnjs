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
    static int count;
    static int get_count();

    Player(std::string n = "None", int h = 0, int x = 0): name(n) {
        count = count + 1;
     };

    Player(const Player &player): name(player.name) {};

    ~Player()
    {
        cout << "Desctructor called for " << name << endl;
    }

    string get_name() const
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

int Player::Player::count {0};

int Player::get_count() {
    return count;
}

int main()
{
    const Player p {"Piotr"};
    cout << Player::count << endl;
    const Player d {"David"};
    cout << Player::get_count() << endl;

    return 0;
}