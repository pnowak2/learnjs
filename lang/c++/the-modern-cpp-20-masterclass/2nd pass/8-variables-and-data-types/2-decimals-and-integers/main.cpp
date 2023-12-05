#include <iostream>

int main()
{
    // braced init
    int elephant_count;
    int lion_count{};
    int dog_count{10};
    int domesticated_animals{dog_count + elephant_count};

    // functional init
    int elephant_count2;
    int dog_count2(10);
    int domesticated_animals2(dog_count + elephant_count);

    int narrowing (2.9 + dog_count); // chops decimals off

    int bike_count = 2;
    int trucks = 2 * bike_count;

    std::cout << "Narrowing: " << narrowing << std::endl;
    std::cout << "Int size: " << sizeof(int) << std::endl;
    std::cout << "bike size: " << sizeof(bike_count) << std::endl;

    return 0;
}