#include <iostream>
#include <iomanip>
#include <cctype>
#include <cstring>
#include <math.h>
#include <vector>

using namespace std;

// just like class, but struct has all members public

struct Person {
    std::string name {""};
    int age {0};

    std::string get_name() {
        return this->name;
    }
};

int main()
{
    Person p;
    p.name = "Piotr";
    cout << p.name << endl;

    Person *pr = new Person;
    pr->name = "Nowak";
    cout << pr->get_name() << endl;
    
    return 0;
}