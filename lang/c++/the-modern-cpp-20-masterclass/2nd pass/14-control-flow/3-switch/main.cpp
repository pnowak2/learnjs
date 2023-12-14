#include <iostream>
#include <bitset>

int main()
{
    char sign {'c'};

    switch(sign) {
        case 'a': {
            std::cout << "a" << std::endl;
        }
        break;
        case 'b':
            std::cout << "b" << std::endl;
            break;
        default: {
            std::cout << "else" << std::endl;
        }
    }

    return 0;
}