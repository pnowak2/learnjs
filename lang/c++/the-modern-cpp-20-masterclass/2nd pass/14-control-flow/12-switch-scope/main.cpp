#include <iostream>
#include <iomanip>

int global_var{44};

int main()
{
    int int_condition {0};

    switch(int_condition) {
        // int x {0};
        case 0:
        // int y {0};
        std::cout << "hello" << std::endl;
        std::cout << "hello" << std::endl;
        // x;
        break;

        case 1:
        std::cout << "hello" << std::endl;
        std::cout << "hello" << std::endl;
        // x;
        // y;
        break;

        case 2:
        std::cout << "hello" << std::endl;
        std::cout << "hello" << std::endl;
        // x;
        // y;
        break;

        default:
        int z {0};
    }

    return 0;
}