#include <iostream>

class Base {
public:
    int a {0};
    void display() { std::cout << a << ", " << b << ", " << c << std::endl; }
protected:
    int b {0};
private:
    int c {0};
};

class Derived : public Base {
  // a is public
  // b is protected
  // c is inaccessible

public:
    void access_base() {
        a = 100;
        b = 200;
        // c = 300; // illegal
    }
};

int main(int argc, char *argv[]) {
    Base base;
    base.a = 100;
    // base.b = 200; // illegal
    // base.c = 300; // illegal

    base.display();

    Derived d;
    d.a = 100;
    // d.b = 200;
    // d.c = 300;

    return 0;
}