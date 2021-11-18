#ifndef _MYSTRING_H_
#define _MYSTRING_H_

#include <string>
#include <iostream>

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
#endif