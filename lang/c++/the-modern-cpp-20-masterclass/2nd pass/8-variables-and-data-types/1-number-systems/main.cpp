#include <iostream>

int main(){
    int number1 = 15; // decimal
    int number2 = 017; // octal
    int number3  = 0x0F;
    int number4 = 0b00001111;

    std::cout << number1 << std::endl;
    std::cout << number2 << std::endl;
    std::cout << number3 << std::endl;
    std::cout << number4 << std::endl;

    return 0;
}