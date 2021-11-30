#include <iostream>
#include <memory>
#include <vector>

using namespace std;

class Abstract {
public:
    virtual void hello() const = 0; 
};

class Derived: public Abstract {
public:
    virtual void hello() const override {
        cout << "Hello, Derived" << endl;
    }
};

int main(int argc, char *argv[]) {
    // Abstract *a = new Abstract(); // illegal, abstract class
    Abstract *p = new Derived();

    p->hello();

    delete p;

    return 0;
}