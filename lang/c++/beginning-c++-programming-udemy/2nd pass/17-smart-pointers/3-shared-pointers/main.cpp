#include <iostream>
#include <memory>
#include <vector>

using namespace std;

class Test {
private:
    int data;
public:
    Test(): data(0) {
        cout << "Test constructor (" << data << ")" << endl;
    }

    Test(int data): data(data) {
        cout << "Test constructor (" << data << ")" << endl;
    }

    ~Test() {
        cout << "Test destructor (" << data << ")" << endl;
    }

    int get_data() const {
        return this->data;
    }
};

int main(int argc, char *argv []) {
    return 0;
}