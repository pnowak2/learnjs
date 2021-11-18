#include <iostream>
#include <iomanip>
#include <cctype>
#include <cstring>
#include <math.h>
#include <vector>

using namespace std;

// just like class, but struct has all members public

class Person {

friend class Intruder;
friend void display_person_name(Person &p);

private:
    std::string name {""};
    int age {0};

public:

    Person(std::string n): name(n) { }
    std::string get_name() {
        return this->name;
    }
};

class Intruder {
    Intruder(Person &p) {
        p.name;
        p.age;
    }
};

void display_person_name(Person &p) {
    cout << p.name << endl;
}

int main()
{
    Person p {"Piotr"};
    display_person_name(p);
    
    return 0;
}