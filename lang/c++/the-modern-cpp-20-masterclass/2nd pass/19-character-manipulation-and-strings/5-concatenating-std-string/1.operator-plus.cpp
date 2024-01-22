#include <iostream>
#include <string>

int main()
{
    std::string str1{"Hello"};
    std::string str2{"World"};

    std::string message = str1 + str2;

    std::cout << message << std::endl;

    // but cannot concatenate two string literals
    // those are actually const char arrays..
    // std::string str3 {"Hello" + "World"};

    // ways to handle that

    std::string str4{"Hello World"};
    std::string str5{"Hello" "World"};
    std::string str6{std::string{"Hello"} + "World"};

    {
        // s is an operator, converts literal to std::string
        using namespace std::string_literals;
        std::string str8{"Hello"s + "World"};
        std::cout << str8 << std::endl;
    }

    // concatenate strings and characters
    std::string result = str1 + '_' + str2;
    std::cout << result << std::endl;

    // concatenate c strings
    const char *msg1 {"Hello"};
    const char msg2 [] {"World"};
    std::string result2 = std::string{"Welcome"} + msg1 + msg2;
    std::cout << result2 << std::endl;

    // concatenate string with number
    std::string result3 = std::string {"Age"} + std::to_string(43);
    std::cout << result3 << std::endl;

    return 0;
}