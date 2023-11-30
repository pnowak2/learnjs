#include <iostream>

int addNumber(int x, int y) {
    int result = x + y;

    return result;
}

int main(){
    int first_number {3};
    int second_number {7};

    int sum = addNumber(first_number, second_number);

    std::cout << "First number: " << first_number << std::endl;
    std::cout << "Second number: " << second_number << std::endl;
    std::cout << "Sum is: " << sum << std::endl;

    sum = addNumber(18, 12);

    std::cout << "Sum is: " << sum << std::endl;
    return 0;
}