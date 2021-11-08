#include <iostream>
#include <iomanip>
#include <cctype>
#include <cstring>
#include <math.h>
#include <vector>

using namespace std;

class Shallow {
private:
    int *data {nullptr};
public:
    Shallow(int d);
    Shallow(const Shallow &source);
    ~Shallow();

    void set_data(int d) { 
        *data = d;
    }

    int get_data() {
        return *data;
    }
};

Shallow::Shallow(int d) {
    data = new int;
    *data = d;
    cout << "int d constructor" << endl;
}

Shallow::Shallow(const Shallow &source): data(source.data) {
    cout << "Copy constructor - shallow" << endl;
}

Shallow::~Shallow() {
    delete data;
    cout << "Destructor" << endl;
}

void display_shallow(Shallow s) {
    cout << s.get_data() << endl;
    cout << "will destruct s and invalidate *data pointer" << endl;
}

int main()
{
    Shallow s1 {2};
    display_shallow(s1);

    cout << "back to main" << endl;
    Shallow s2 {s1};
    s2.set_data(5);
    display_shallow(s2);

    return 0;
}