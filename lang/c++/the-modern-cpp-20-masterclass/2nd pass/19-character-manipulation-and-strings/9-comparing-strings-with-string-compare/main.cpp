#include <iostream>

int main()
{
    std::string str1 {"hello"};
    std::string str2 {"bello"};

    std::cout << "str1.compare(str2): " << str1.compare(str2) << std::endl;
    std::cout << "str2.compare(str1): " << str2.compare(str1) << std::endl;

    // compare part of string

    std::cout << str1.compare(1, 4,"ello") << std::endl; // take from idx 1 of str1 and 4 chars, compare to another string

    return 0;
}