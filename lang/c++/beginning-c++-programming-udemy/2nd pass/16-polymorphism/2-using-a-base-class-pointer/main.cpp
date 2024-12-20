#include <iostream>
#include <memory>
#include <vector>

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
    Base *p1 = new Base();
    Base *p2 = new Derived();

    Base *arr [] = {p1, p2};
    for(auto item : arr) {
        item->hello();
    }

    cout << "==" << endl;

    vector<Base *> vtr {p1, p2};
    for(auto item : vtr) {
        item->hello();
    }



    return 0;
}