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
        name = "None";
        health = 100;
        xp = 3;
    }

    Player(string n, int h, int x) {
        name = n;
        health = h;
        xp = x;
    }

    void set_name(string n) {
        name = n;
    }

    string get_name() {
        return name;
    }
};

int main()
{
    Player hero;
    Player piotr {"Piotr", 100, 10};
    cout << piotr.get_name() << endl;

    return 0;
}