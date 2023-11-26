#include <iostream>
#include <iomanip>

int main () {
    bool red_light {true};
    bool green_light {false};

    if(red_light) {
        std::cout << "Stop!" << std::endl;
    } else {
        std::cout << "Go!" << std::endl;
    }


    std::cout << std::boolalpha;
    std::cout << "Red light: " << red_light << std::endl;
    std::cout << sizeof(bool);

    return 0;
}