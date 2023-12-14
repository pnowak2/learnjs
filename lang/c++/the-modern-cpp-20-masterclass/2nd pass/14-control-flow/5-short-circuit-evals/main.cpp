#include <iostream>
#include <bitset>

int main()
{
    bool a{true};
    bool b{true};
    bool c{true};
    bool d{false};

    bool result = a && b && c && d;
    result = a || b || c || d;

    return 0;
}