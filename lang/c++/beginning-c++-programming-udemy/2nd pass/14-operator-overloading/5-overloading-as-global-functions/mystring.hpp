#include <cstring>
#include <iostream>

using namespace std;

class MyString {

friend MyString operator-(const MyString &obj);
friend bool operator==(const MyString &lhs, const MyString &rhs); 
friend MyString operator+(const MyString &lhs, const MyString &rhs); 

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

    MyString &operator=(const MyString &src) {
        cout << "operator=" << endl;

        if(this == &src) {
            return *this;
        }

        delete [] str;

        str = new char[strlen(src.str + 1)];
        strcpy(str, src.str);

        return *this;
    }

    MyString &operator=(MyString &&rhs) { // not const as we will modify it, && means right hand side, temporary object
        if(this == &rhs) {
            return *this;
        }

        delete [] str;

        str = rhs.str;
        rhs.str = nullptr;

        return *this;
    }

    MyString &operator=(const char* src) {
        delete [] str;

        str = new char[strlen(src + 1)];
        strcpy(str, src);

        return *this;
    }
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

bool operator==(const MyString &lhs, const MyString &rhs){
    return (strcmp(lhs.str, rhs.str) == 0);
}

MyString operator-(const MyString &obj) {
    char *buff = new char[strlen(obj.str) + 1];
    strcpy(buff, obj.str);

    for(size_t i; i < strlen(buff); i++) {
        buff[i] = tolower(buff[i]);
    }

    MyString temp {buff};

    delete [] buff;

    return temp;
}

MyString operator+(const MyString &lhs, const MyString &rhs) {
    char *buff = new char[strlen(lhs.str) + strlen(rhs.str) + 1];
    strcpy(buff, lhs.str);
    strcpy(buff, rhs.str);

    MyString temp {buff};
    delete [] buff;

    return temp;
}

void MyString::display() const {
    cout << str << endl;
}