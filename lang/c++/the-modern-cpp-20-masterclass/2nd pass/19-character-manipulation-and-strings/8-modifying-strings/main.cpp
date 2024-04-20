#include <iostream>

int main()
{
    // clear
    std::string str1 {"hello"};
    std::cout << str1 << std::endl;
    str1.clear();
    std::cout << str1 << std::endl;

    // insert
    std::string str2 {"foo"};
    str2.insert(1, " hi "); // insert c string at index
    std::cout << str2 << std::endl;

    std::string str3 {"world"};
    str3.insert(1, 3, 'x'); // insert 3 times x at position 1
    std::cout << str3 << std::endl;

    std::string str4 {"hello"};
    str4.insert(1, "verylong text", 4); // inserts to str4 at pos 1, 4 chars of given c string text
    std::cout << str4 << std::endl;

    std::string str5 {"foo"};
    str5.insert(1, str4); // insert  std::string at index
    std::cout << str5 << std::endl;

    std::string str6 {"foo"};
    std::string str7 {"my dear"};
    str6.insert(1, str7, 3, 4); // insert  part of string starting at idx 1 with 2 chars
    std::cout << str6 << std::endl;

    // erase
    std::string str8 {"hello world"};
    str8.erase(5, 1); // remove 1 character at idx 5
    std::cout << str8 << std::endl;
    str8.erase(5); // remove all chars after idx 5
    std::cout << str8 << std::endl;

    // push_back
    std::string str9 {"hello world"};
    str9.push_back('!'); // appends character to the string
    std::cout << str9 << std::endl;

    // pop_back
    str9.pop_back(); // removes character to the string
    std::cout << str9 << std::endl;

    return 0;
}