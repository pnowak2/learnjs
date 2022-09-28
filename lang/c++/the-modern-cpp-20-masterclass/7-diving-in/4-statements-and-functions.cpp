#include <iostream>

int addNumbers(int first, int second) {
    int result = first + second;
    return result;
}

int main () {
    int first_num {3};
    int second_num {5};

    std::cout << first_num << second_num;

    int sum = addNumbers(3, 5);
    std::cout << std::endl;
    std::cout << sum;

    int sum2 = addNumbers(17, 16);
    std::cout << std::endl;
    std::cout << sum2;

    return 0;
}