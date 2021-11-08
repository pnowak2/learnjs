#include <iostream>
#include <iomanip>
#include <cctype>
#include <cstring>
#include <math.h>
#include <vector>

using namespace std;

class Deep {
private:
    int *data {nullptr};
public:
    Deep(int d);
    Deep(const Deep &source);
    ~Deep();

    void set_data(int d) { 
        *data = d;
    }

    int get_data() {
        return *data;
    }
};

Deep::Deep(int d) {
    data = new int;
    *data = d;
    cout << "int d constructor" << endl;
}


Deep::Deep(const Deep &source): Deep(*source.data) {
    cout << "Copy constructor - deep" << endl;
}

// or same but not dry
//
// Deep::Deep(const Deep &source) {
//     data = new int;
//     *data = *source.data;
//     cout << "Copy constructor - deep" << endl;
// }

Deep::~Deep() {
    delete data;
    cout << "Destructor" << endl;
}

void display_deep(Deep s) {
    cout << s.get_data() << endl;
    cout << "will destruct s and invalidate *data pointer" << endl;
}

int main()
{
    Deep s1 {2};
    display_deep(s1);

    cout << "back to main" << endl;
    Deep s2 {s1};
    s2.set_data(5);
    display_deep(s2);

    return 0;
}