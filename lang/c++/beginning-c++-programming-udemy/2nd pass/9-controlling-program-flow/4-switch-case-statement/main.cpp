#include <iostream>

using namespace std;

enum Color {
    BLACK, RED, WHITE
};


char check(Color value)
{
    switch (value) { // must evaluate to integer!
    case RED:
        return 'R';
    case 2:
    case 4:
        return 'W';
    default:
        return 'B';
    }
}

int main()
{
    Color c {BLACK};

    cout << check(c) << check(RED) << check(WHITE);
    return 0;
}