#include <iostream>

using namespace std;

class Base {
private:
    int value;

public:
    int getValue() { return this->value; }
    Base(): value{0} { cout << "Base no-args constructor" << endl; }
    Base(const Base &src): value{src.value} { cout << "Base (copy) constructor" << endl; }

    Base &operator=(const Base &rhs) {
        if(this != &rhs) {
            value = rhs.value;
        }

        return *this;
    }
};

class Derived : public Base {
private:
    int doubled_value;
public:
    Derived(): Base(), doubled_value {0} { cout << "Derived no-args constructor" << endl; }
    Derived(const Derived &src): Base {src}, doubled_value{src.doubled_value} { cout << "Derived (copy) constructor" << endl; }

    Derived &operator=(const Derived &rhs) {
        if(this != &rhs) {
            Base::operator=(rhs);
            doubled_value = rhs.doubled_value;
        }

        return *this;
    }
};

void display(Base obj) {
    cout << obj.getValue() << endl;
}

void display(Derived obj) {
    cout << obj.getValue() << endl;
}

int main(int argc, char *argv[]) {
    Base a;
    display(a);

    Derived d;
    display(d);

    a = d;

    return 0;
}