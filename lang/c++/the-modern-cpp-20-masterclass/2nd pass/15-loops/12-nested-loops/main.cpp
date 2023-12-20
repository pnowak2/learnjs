#include <iostream>
#include <iomanip>

int main()
{
    const size_t ROWS{2};
    const size_t COLS{3};

    for (size_t row{0}; row < ROWS; ++row)
    {
        for (size_t col{0}; col < COLS; ++col)
        {
            std::cout << std::setw(2) << " row " << row << " col " << col << ", ";
        }
        std::cout << std::endl;
    }

    return 0;
}