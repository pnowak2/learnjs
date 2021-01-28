#include <iostream>

int main() {
    int number;
    
    std::cout << "Enter your favourite number between 1 and 100: ";
    std::cin >> number;
    
    std::cout << "Amazing, that's my favourite number too!" << std::endl;
    
    std::cout << "No really!!, " << number << " is my favourite number!";
    
    return 0;
}
