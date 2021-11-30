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

class Derived final: public Base {
public:
    virtual void hello() const override final {
        cout << "Hello, Derived" << endl;
    }
};

// class Gamma : public Derived { }; // error, cannot inherit from final class

int main(int argc, char *argv[]) {
    Base *p1 = new Base();
    Base *p2 = new Derived();

    p2->hello();

    return 0;
}