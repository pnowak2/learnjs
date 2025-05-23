#include <cstring>
#include <iostream>

using namespace std;

class MyString {
private:
    char *str;

public:
    MyString();
    MyString(const char *str);
    MyString(const MyString &src);
    ~MyString();

    void display() const;
    int get_length() const;
    const char *get_str() const;
};

MyString::MyString(): str {nullptr} {
    str = new char[1];
    *str = '\0';
}

MyString::MyString(const char *s): str {nullptr} {
    if(s == nullptr) {
        str = new char[1];
        *str = '\0';
    } else {
        str = new char[strlen(s) + 1];
        strcpy(str, s);
    }
}

MyString::MyString(const MyString &src): MyString(src.str) { }

MyString::~MyString() {
    delete [] str;
}

void MyString::display() const {
    cout << str << endl;
}