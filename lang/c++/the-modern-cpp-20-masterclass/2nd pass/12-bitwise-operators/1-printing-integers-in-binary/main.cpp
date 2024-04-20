#include <iostream>
#include <bitset>

int main()
{
    unsigned short int data{0b11111110};

    std::cout << "data (dec): " << std::dec << data << std::endl;
    std::cout << "data (hex): " << std::hex << data << std::endl;
    std::cout << "data (bin): " << std::bitset<16>(data) << std::endl;

    unsigned short int my_data {15};
    std::cout << std::showbase;
    std::cout << "my data (dec): " << std::dec << my_data << std::endl;
    std::cout << "my data (oct): " << std::oct << my_data << std::endl;
    std::cout << "my data (hex): " << std::hex << my_data << std::endl;
    std::cout << "my data (bin): " << std::bitset<8>(my_data) << std::endl;

    return 0;
}