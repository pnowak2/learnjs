#include <iostream>
#include <iomanip>
#include <bitset>

int main()
{
    unsigned int packages[2][3]{
        {1, 2, 3},
        {4, 5, 6},
    };

    std::cout << "size: " << sizeof(packages) << std::endl;    // 48
    std::cout << "size: " << std::size(packages) << std::endl; // 4

    for (size_t i{0}; i < std::size(packages); i++)
    {
        for (size_t j{0}; j < std::size(packages[i]); j++)
        {
            std::cout << "Item (" << i << ", " << j << "): " << packages[i][j] << std::endl;
        }
    }

    int house_block[2][3][4]{
        {
            {1, 2, 3, 4},
            {3, 4, 5, 6},
            {7, 8, 9, 10},
        },
        {

            {1, 2, 3, 4},
            {3, 4, 5, 6},
            {7, 8, 9, 10},
        }};

    for (size_t i{0}; i < std::size(house_block); i++)
    {
        for (size_t j{0}; j < std::size(house_block[i]); j++)
        {
            for (size_t k{0}; k < std::size(house_block[i][j]); k++)
            {
                std::cout << "Item: " << house_block[i][j][k] << std::endl;
            }
        }
    }
}