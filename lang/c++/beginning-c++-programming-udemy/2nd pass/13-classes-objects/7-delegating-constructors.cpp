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
    Player() : Player("None") {}

    Player(std::string n): Player( n, 0 ) {}

    Player(std::string n, int h) : Player(n, h, 0) {}

    Player(std::string n, int h, int x) : name{n}, health{h}, xp{x} {}

    void set_name(std::string n)
    {
        name = n;
    }

    string get_name()
    {
        return name;
    }
};

int main()
{
    Player hero;
    Player andy{"Andy", 7, 6};
    Player piotr{"Piotr", 100, 10};

    cout << hero.get_name() << endl;
    cout << andy.get_name() << endl;
    cout << piotr.get_name() << endl;

    return 0;
}