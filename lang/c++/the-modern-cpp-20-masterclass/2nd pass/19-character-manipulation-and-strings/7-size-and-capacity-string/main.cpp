#include <iostream>

int main()
{
    std::string str1 {"hello world"};
    std::string str2;
    std::string str3 {};

    std::cout << "str1 is empty: " << std::boolalpha << str1.empty() << std::endl;
    std::cout << "str2 is empty: " << std::boolalpha << str2.empty() << std::endl;
    std::cout << "str3 is empty: " << std::boolalpha << str3.empty() << std::endl;

    std::cout << "str1 size: " << str1.size() << std::endl;
    std::cout << "str2 size: " << str2.size() << std::endl;
    std::cout << "str3 size: " << str3.size() << std::endl;

    std::cout << "str1 length: " << str1.length() << std::endl;
    std::cout << "str2 length: " << str2.length() << std::endl;
    std::cout << "str3 length: " << str3.length() << std::endl;

    // max size of string on system

    std::cout << "max size on system: " << str1.max_size() << std::endl;

    // capacity will show how many space is allocated at start, can be auto increased when string grows
    std::cout << "str1 capacity: " << str1.capacity() << std::endl;
    std::cout << "str2 capacity: " << str2.capacity() << std::endl;
    std::cout << "str3 capacity: " << str3.capacity() << std::endl;

    // update capacity to another value
    str1.reserve(100);
    std::cout << "str1 capacity: " << str1.capacity() << std::endl;

    // shrink allocated size to fit exact amount needed
    str1.shrink_to_fit();
    std::cout << "str1 capacity: " << str1.capacity() << std::endl;

    return 0;
}