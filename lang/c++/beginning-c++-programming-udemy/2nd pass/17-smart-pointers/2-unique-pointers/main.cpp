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
    // normal pointers
    Test t1 {1000};
    Test *tptr = new Test {2000};
    delete tptr;

    vector<Test *> ptr_tests;
    ptr_tests.push_back(new Test {1});
    ptr_tests.push_back(new Test {2});
    ptr_tests.push_back(new Test {3});

    for(const auto &t : ptr_tests) {
        cout << t->get_data() << endl;
    }

    // unique pointer
    unique_ptr<Test> ut {new Test {100}}; 
    // or better, without new
    unique_ptr<Test> ut2 = make_unique<Test>(1500);

    // cannot copy unique pointers, but you can move them
    unique_ptr<Test> ut3;
    ut3 = move(ut);

    if(!ut) {
        cout << "ut is not a pointer anymore, now ut3 owns that object" << endl;
    }

    vector<unique_ptr<Test>> tests;
    tests.push_back(make_unique<Test>(100));
    tests.push_back(make_unique<Test>(200));
    tests.push_back(make_unique<Test>(300));

    for (const auto &t : tests) { // dont copy, use by reference
        cout << t->get_data() << endl;
    }

}