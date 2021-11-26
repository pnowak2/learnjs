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

void display(Base &obj) {
    obj.hello();
}

int main(int argc, char *argv[]) {
    Base *p1 = new Base();
    Base *p2 = new Derived();

    display(*p1);
    display(*p2);

    return 0;
}