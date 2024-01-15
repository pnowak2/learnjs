#include <iostream>

int main()
{
    int scores[] = { 1,2,3,4,5,6,7,8,9,10 };

    for(auto item : scores) {
        // makes local copy, does not affect original item
        item = item * 10;
    }

    for(auto& item : scores) {
        std::cout << item << std::endl;
    }

    std::cout << std::endl;

    for(auto& item : scores) {
        item = item * 10;
    }

    for(auto& item : scores) {
        std::cout << item << std::endl;
    }

    return 0;
}