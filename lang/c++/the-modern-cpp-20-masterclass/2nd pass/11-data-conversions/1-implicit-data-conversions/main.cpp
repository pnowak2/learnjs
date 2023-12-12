#include <iostream>

int main()
{
    double price{45.6};
    int units{10};
    double total = price * units;

    std::cout << "total: " << total << std::endl;
    std::cout << sizeof(total);

    return 0;
}