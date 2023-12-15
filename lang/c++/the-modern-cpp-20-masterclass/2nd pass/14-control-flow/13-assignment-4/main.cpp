#include <iostream>
#include <iomanip>

int main()
{
    int value {0};
    std::cout << "Which day is today [1: Monday, ..., 7: Sunday]:" << std::endl;
    std::cin >>  value;

    std::cout << std::endl;
    std::cout << "Today is: ";

    switch(value) {
        case 0:
            std::cout << "Monday";
            break;
        case 1:
            std::cout << "Tuesday";
            break;
        case 2:
            std::cout << "Wednesday";
            break;
        case 3:
            std::cout << "Thursday";
            break;
        case 4:
            std::cout << "Friday";
            break;
        case 5:
            std::cout << "Saturday";
            break;
        case 6:
            std::cout << "Sunday";
            break;
        default:
            std::cout << "a day out of range, choose between 0-6";
    }

    return 0;
}