#include <iostream>

int main()
{
    std::string str1 {"Finding Nemo"};
    std::string str2 {"Searching for"};

    // replace first 7 chars with str2
    str1.replace(0, 7, str2); 
    std::cout << str1 << std::endl;

    // replace part of string with part of other string
    std::string str3 {"Finding Nemo"};
    std::string str4 {"I will look for somebody"};
    str3.replace(0, 7, str4, 7, 8);
    std::cout << str3 << std::endl;

    // copy from string, paste to c string given part of string
    char dest[15] {};
    str3.copy(dest, 4, 9);
    std::cout << dest << std::endl;

    // resize string, fills rest with null chars
    std::string str5 {"how are you"};
    str5.resize(3);
    std::cout << str5 << std::endl;
    str5.resize(5, 'f'); // fill rest with given character
    std::cout << str5 << std::endl;

    // swap strings
    std::string a {"hello"};
    std::string b {"world"};

    a.swap(b);

    std::cout << a << std::endl;
    std::cout << b << std::endl;

    return 0;
}