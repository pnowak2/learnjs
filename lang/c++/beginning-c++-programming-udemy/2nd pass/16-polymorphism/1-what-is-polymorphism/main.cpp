#include <iostream>
#include <memory>

using namespace std;

class Base {
public:
    void hello() const {
        cout << "Hello, Base" << endl;
    }
};

class Derived: public Base {
public:
    void hello() const {
        cout << "Hello, Derived" << endl;
    }
};

void greetings(const Base &obj) {
    cout << "Greetings: ";
    obj.hello();
}

int main(int argc, char *argv[]) {
    Base b;
    b.hello();

    Derived d;
    d.hello();

    greetings(b);
    greetings(d);

    Base *ptr = new Derived();
    ptr->hello();

    greetings(*ptr);

    std::unique_ptr<Base> ptr1 = std::make_unique<Derived>();
    ptr->hello();

    return 0;
}