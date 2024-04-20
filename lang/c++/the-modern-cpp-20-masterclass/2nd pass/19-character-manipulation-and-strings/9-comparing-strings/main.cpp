#include <iostream>

int main()
{
    std::string str1 {"hello"};
    std::string str2 {"bello"};
    const char* c_string {"cello"};

    std::cout << std::boolalpha;
    std::cout << str1 << "==" << str2 << " : " << (str1 == str2) << std::endl;
    std::cout << str1 << "!=" << str2 << " : " << (str1 != str2) << std::endl;
    std::cout << str1 << ">" << str2 << " : " << (str1 > str2) << std::endl;
    std::cout << str1 << ">=" << str2 << " : " << (str1 >= str2) << std::endl;
    std::cout << str1 << "<" << str2 << " : " << (str1 < str2) << std::endl;
    std::cout << str1 << "<=" << str2 << " : " << (str1 <= str2) << std::endl;

    std::cout << std::endl;

    std::cout << str1 << "==" << c_string << " : " << (str1 == c_string) << std::endl;
    std::cout << str1 << "!=" << c_string << " : " << (str1 != c_string) << std::endl;
    std::cout << str1 << ">" << c_string << " : " << (str1 > c_string) << std::endl;
    std::cout << str1 << ">=" << c_string << " : " << (str1 >= c_string) << std::endl;
    std::cout << str1 << "<" << c_string << " : " << (str1 < c_string) << std::endl;
    std::cout << str1 << "<=" << c_string << " : " << (str1 <= c_string) << std::endl;

    return 0;
}