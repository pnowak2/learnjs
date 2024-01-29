#include <iostream>

int main()
{
    std::string str1 {R"(I am
    raw 
    string \with\
    literal)"};

    std::cout << str1 << std::endl;

    std::string str2 = R"(howdy
    you "smart"
    developer)";

    std::cout << str2 << std::endl;

    // works with const char pointers too

    const char * c_ptr = R"(howdy
    you
    dev)";

    std::cout << c_ptr << std::endl;

    // custom R delimiters
    std::string str3 = R"---(now "(Stay out of this!)")---";
    std::cout << str3 << std::endl;

    return 0;
}