#include <iostream>
#include <iomanip>
#include <cctype>
#include <cstring>
#include <math.h>
#include <vector>

using namespace std;

class Move
{
private:
    int *data;

public:
    Move(int d);
    Move(const Move &source);
    Move(Move &&source);

    ~Move();

    void set_data(int d) { *data = d; };
    int get_data() { return *data; };
};

Move::Move(int d)
{
    data = new int;
    *data = d;
    cout << "int constructor " << *data << endl;
}

Move::Move(const Move &source) : Move(*source.data) {
    cout << "Copy constructor " << *data << endl;
}

Move::Move(Move &&source) : data(source.data) // move constructor, DONT ALLOCATE ANYTHING ON HEAP, JUST REUSE EXISTING BY REWRITING POINTER.
                                              // works because data passed is r-value, temporary lost as scope is lost
{
    source.data = nullptr;
    cout << "Move constructor " << *data << endl;
}

Move::~Move() {
    cout << "Desctuctor " << *data << endl;
    delete data;
}

int main()
{
    int x{100};
    int &l_ref = x; // l-value reference

    int &&r_ref = 200; // r-value reference
    r_ref = 300;

    vector<Move> vec;

    vec.push_back(Move{10});
    vec.push_back(Move{20});

    return 0;
}