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
    Player() {
        cout << "constructor, no args" << endl;
    }

    Player(string name) {
        cout << "constructor, string" << endl;
    }

    Player(string name, int health, int xp) {
        cout << "constructor, string, int, int" << endl;
    }

    ~Player() {
        cout << "destructing: " << name << endl;
    }

    void set_name(string n) {
        name = n;
    }

    void talk(std::string txt) {
        cout << name << " says: " << txt << endl;
    }
    bool is_dead();
};

int main()
{
    {
        Player piotr;
        piotr.set_name("piotr");
    }
    {
        Player frank {"Frank"};
        frank.set_name("frank");
        Player hero {"Hero", 50, 5};
        hero.set_name("hero");

    }
    Player *enemy = new Player {"enemy", 100, 10};
    enemy->set_name("enemy");
    delete enemy;

    Player *p1 = new Player();
    p1->set_name("p1");
    Player *p2 = new Player();
    p2->set_name("p2");
    Player *p3 = new Player();
    p3->set_name("p3");
    const Player *const players[] = {p1, p2, p3};

    for(auto p : players) {
        delete p;
    }

    return 0;
}