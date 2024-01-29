#include <iostream>

int main()
{
    std::string str1 {"red fox jumps over the bridge and the water"};
    std::string str2 {"the"};

    std::cout << str1.find(str2) << std::endl; // the is on 19th position
    std::cout << str1.find(str2, 20) << std::endl; // start searching from index 20 onwards, will match at idx 34

    // returns npos if not found
    std::cout << std::string::npos << std::endl; // should not match
    std::cout << (str2.find(str1) == std::string::npos) << std::endl;

    return 0;
}