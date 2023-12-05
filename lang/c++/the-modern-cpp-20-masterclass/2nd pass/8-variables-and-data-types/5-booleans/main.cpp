#include <iostream>
#include <iomanip>

int main()
{
    bool red_light{true};
    bool green_light{false};

    std::cout << std::boolalpha;

    std::cout << "Boolean size: " << sizeof(bool) << std::endl;
    std::cout << "Red light: " << red_light << std::endl;
    std::cout << "Green light: " << green_light << std::endl;

    if(red_light) {
        std::cout << "Stop" << std::endl;
    } else {
        std::cout << "Go" << std::endl;
    }

    return 0;
}