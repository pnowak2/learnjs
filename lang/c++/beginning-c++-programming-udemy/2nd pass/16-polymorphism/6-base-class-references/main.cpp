#include <iostream>
#include <memory>
#include <vector>

using namespace std;

class Base {
public:
    virtual void hello() const {
        cout << "Hello, Base" << endl;
    }
};

class Derived: public Base {
public:
    virtual void hello() const override {
        cout << "Hello, Derived" << endl;
    }
};

int main(int argc, char *argv[]) {
    Base *p1 = new Base();
    Base *p2 = new Derived();

    p2->hello();

    return 0;
}