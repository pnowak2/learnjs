#include <iostream>

int main()
{
    float float_var {22.3f};
    double double_var {1.34847e5};
    int int_var {226};

    // number to string
    std::cout << std::to_string(float_var) << std::endl;
    std::cout << std::to_string(double_var) << std::endl;
    std::cout << std::to_string(int_var) << std::endl;

    // string to number

    // int
    std::cout << std::stoi("176") << std::endl;
    // long
    std::cout << std::stol("176") << std::endl;
    // unsinged long
    std::cout << std::stoul("176") << std::endl;
    // long long
    std::cout << std::stoll("176") << std::endl;
    // unsinged long long
    std::cout << std::stoull("176") << std::endl;
    // float
    std::cout << std::stof("176.34") << std::endl;
    // double
    std::cout << std::stod("176.34") << std::endl;
    // long double
    std::cout << std::stold("176.34") << std::endl;

    return 0;
}