#include <iostream>
#include <iomanip>

int main()
{
    int a {6};
    int b {5};

    const auto result = (a < b) ? true : 'b';
    std::cout << std::boolalpha << result;

    return 0;
}