#include <iostream>

int main()
{
    auto var1 {12};
    auto var2 {12.0f};
    auto var3 {12L};
    auto var4 {12.0};
    auto var5 {'A'};
    auto var6 {12ul};
    auto var7 {17ll};
    auto var8 {10u};

    var8 = -2;

    cout << "var8 is: " << var8 << std::endl; // prints garbage

    return 0;
}