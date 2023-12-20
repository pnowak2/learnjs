#include <iostream>

int main()
{
    // C++17
    int scores[] {10, 20, 30, 40, 50};
    std::cout << "size: " << std::size(scores) << std::endl;

    for(auto score : scores) {
        std::cout << score << std::endl;
    }

    // prior C++17
    auto intSizeInBytes = sizeof(int);
    auto arraySizeInBytes = sizeof(scores);
    auto arraySize = arraySizeInBytes / intSizeInBytes;

    std::cout << "int size in bytes: " << intSizeInBytes << std::endl;
    std::cout << "array size in bytes: " << arraySizeInBytes << std::endl;
    std::cout << "size: " << arraySize << std::endl;

    return 0;
}