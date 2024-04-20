#include <iostream>

int main()
{
    std::string str1 {"hello there"};
    std::cout << str1.size() << std::endl;

    for(size_t i {}; i < str1.size(); ++i) {
        std::cout << " " << str1[i];
    }

    std::cout << std::endl;

    for(size_t i {}; i < str1.size(); ++i) {
        str1.at(i) = std::toupper(str1.at(i));

        std::cout << " " << str1.at(i);
    }

    std::cout << std::endl;

    for(auto chr : str1) {
       std::cout << chr << "-";
    }

    std::cout << std::endl;

    char& frontRef = str1.front();
    char& backRef = str1.back();

    std::cout << frontRef << backRef << std::endl;

    // getting c string, immutable

    const char * cstring = str1.c_str();
    std::cout << cstring << std::endl;

    // or get data, mutable
    char * cdata = str1.data();
    std::cout << cdata << std::endl;

    return 0;
}