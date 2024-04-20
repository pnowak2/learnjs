#include <iostream>

int main()
{
    const unsigned int COUNT {10};
    unsigned int i {COUNT};
    while(i > 0) {
        std::cout << i;
        i--;
    }

    for(unsigned int i {COUNT}; i > 0; i--) {
        std::cout << i;
    }


    return 0;
}