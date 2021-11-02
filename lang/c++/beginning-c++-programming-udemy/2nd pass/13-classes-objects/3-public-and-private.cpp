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
    std::string name {""};
    int health {0};
    int xp {3};

public:
    void talk(std::string txt) {
        cout << name << " says: " << txt << endl;
    }
    bool is_dead();
};

int main()
{
    Player player;
    // player.name = "Piotr"; // illegal, private property
    // player.health = 100; // illegal, private property
    player.talk("hello there");

    return 0;
}