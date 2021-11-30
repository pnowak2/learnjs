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

void func(Test t) {
    cout << "func: " << t.get_data() << endl;
}

int main(int argc, char *argv []) {
    shared_ptr<int> p1 {new int(100)};
    cout << "Use count " << p1.use_count() << endl;

    shared_ptr<int> p2 {p1};

    cout << "Use count " << p1.use_count() << endl;

    p1.reset();

    cout << "p1 Use count " << p1.use_count() << endl;
    cout << "p2 Use count " << p2.use_count() << endl;

    cout << "====" << endl;

    shared_ptr<Test> ptr = make_shared<Test>(100);
    func(*ptr.get());

    cout << "use count: " << ptr.use_count() << endl;

    {
        shared_ptr<Test> ptr1 = ptr;
        cout << "use count: " << ptr.use_count() << endl;
        {
            shared_ptr<Test> ptr2 = ptr;
            cout << "use count: " << ptr.use_count() << endl;
            ptr.reset();
        }
        cout << "use count: " << ptr.use_count() << endl;
    }

    cout << "use count: " << ptr.use_count() << endl;

    cout << "====" << endl;

    return 0;
}