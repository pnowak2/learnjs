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

    MyString operator-() const;
    MyString operator+(const MyString &rhs) const;
    bool operator==(const MyString &rhs) const;

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

bool MyString::operator==(const MyString &rhs) const {
    return (strcmp(str, rhs.str) == 0);
}

MyString MyString::operator-() const {
    char *buff = new char[strlen(str) + 1];
    strcpy(buff, str);

    for(size_t i; i < strlen(buff); i++) {
        buff[i] = tolower(buff[i]);
    }

    MyString temp {buff};

    delete [] buff;

    return temp;
}

MyString MyString::operator+(const MyString &rhs) const {
    char *buff = new char[strlen(str) + strlen(rhs.str) + 1];
    strcpy(buff, str);
    strcpy(buff, rhs.str);

    MyString temp {buff};
    delete [] buff;

    return temp;
}

void MyString::display() const {
    cout << str << endl;
}