#include <iostream>

int main()
{
    bool end {false};

    std::cout << "Welcome" << std::endl;

    while((end == false)) {
        std::cout << "Continue ? y/n: ";
        char go_on {};
        std::cin >> go_on;

        if(go_on == 'y') {
            end = false;
        } else {
            end = true;
        }
    }

    return 0;
}