#include <iostream>

int main()
{
    int values[] {1,2,3,4,5};

    for(auto val : values) {
        std::cout << val;
    }

    return 0;
}