#include <cstring>
#include "mystring.hpp"

MyString::MyString(): str {nullptr} {
    str = new char[1];
    *str = '\0';
}

MyString::MyString(const char *s): str {nullptr} {
    if(str == nullptr) {
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