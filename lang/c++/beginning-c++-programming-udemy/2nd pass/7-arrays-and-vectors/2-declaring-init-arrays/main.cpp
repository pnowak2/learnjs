#include <iostream>

using namespace std;

int main() {

    int scores[5] { 100, 80, 60, 40, 20};
    int levels[10] {0, 20};

    const short size = 5;
    int days[size] {0};

    int temps[] { 20, 40, 60};

    cout << "scores: " << scores << endl;
    cout << "levels: " << levels << endl;
    cout << "days: " << days << endl;
    cout << "temps: " << temps << endl;

    return 0;
}