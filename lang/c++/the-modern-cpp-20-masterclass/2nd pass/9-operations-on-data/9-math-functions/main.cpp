#include <iostream>
#include <limits>

int main()
{
    std::cout << "Lowest for short: " << std::numeric_limits<short>::lowest() << std::endl;
    std::cout << "Minimum for short: " << std::numeric_limits<short>::min() << std::endl;
    std::cout << "Maximum for short: " << std::numeric_limits<short>::max() << std::endl;

    std::cout << "Lowest for float: " << std::numeric_limits<float>::lowest() << std::endl;
    std::cout << "Minimum for float: " << std::numeric_limits<float>::min() << std::endl;
    std::cout << "Maximum for float: " << std::numeric_limits<float>::max() << std::endl;
    return 0;
}