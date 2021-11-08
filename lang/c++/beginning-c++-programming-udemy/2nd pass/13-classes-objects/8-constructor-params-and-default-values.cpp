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
    Player(
        std::string n = "None", 
        int h = 0, 
        int x = 0) : name{n}, health{h}, xp{x} {}

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
    Player chris{"Chris"};
    Player andy{"Andy", 7};
    Player piotr{"Piotr", 100, 10};

    cout << hero.get_name() << endl;
    cout << chris.get_name() << endl;
    cout << andy.get_name() << endl;
    cout << piotr.get_name() << endl;

    return 0;
}