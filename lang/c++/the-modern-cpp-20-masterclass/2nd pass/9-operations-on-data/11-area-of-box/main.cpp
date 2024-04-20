#include <iostream>
#include <limits>

int main()
{
    float width {};
    float length {};
    float height {};

    std::cout << "Provide width, length, height and press <enter>" << std::endl;

    std::cin >> width >> length >> height;

    auto base_area = width * length;
    auto volume = base_area * height;

    std::cout << "Volume is: " << volume;
    return 0;
}