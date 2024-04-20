#include <iostream>

int main()
{
    const char * words [] {
        "Hello",
        "From",
        "Here"
    };

    for(auto str : words) {
        std::cout << str << std::endl;
    }

    return 0;
}