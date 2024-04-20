#include <iostream>
#include <iomanip>

int global_var{45};

int main()
{
    bool green{false};

    if (green)
    {
        int car_count{23};
        std::cout << "light is green " << car_count << std::endl;
    }
    else
    {
        std::cout << "light is not green " << std::endl;
        // car_count; // not accessible
    }

    return 0;
}