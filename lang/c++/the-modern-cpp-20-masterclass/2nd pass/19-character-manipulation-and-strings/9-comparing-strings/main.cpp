#include <iostream>

int main()
{
    std::string str1 {"hello"};
    std::string str2 {"bello"};

    std::cout << std::boolalpha;
    std::cout << str1 << "==" << str2 << " : " << (str1 == str2) << std::endl;
    std::cout << str1 << "!=" << str2 << " : " << (str1 != str2) << std::endl;
    std::cout << str1 << ">" << str2 << " : " << (str1 > str2) << std::endl;
    std::cout << str1 << ">=" << str2 << " : " << (str1 >= str2) << std::endl;
    std::cout << str1 << "<" << str2 << " : " << (str1 < str2) << std::endl;
    std::cout << str1 << "<=" << str2 << " : " << (str1 <= str2) << std::endl;

    return 0;
}