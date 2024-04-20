#include <iostream>
#include <iomanip>

int main()
{
    int value {0};
    std::cout << "Please type in an integral value: " << std::endl;
    std::cin >>  value;

    bool is_even = value % 2 ? true : false;

    if(is_even) {
        std::cout << "The number " << value << " is even";
    } else {
        std::cout << "The number " << value << " is odd";
    }
    return 0;
}