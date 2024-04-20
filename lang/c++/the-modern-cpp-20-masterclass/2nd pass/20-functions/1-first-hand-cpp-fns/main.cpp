#include <iostream>

void enter_bar(int age) {
    if(age > 18) {
        std::cout << "ok" << std::endl;
    } else {
        std::cout << "not ok" << std::endl;
    }
}

int max(int a, int b) {
    if(a > b) {
        return a;
    } else {
        return b;
    }
}

void hello() {
    std::cout << "hello" << std::endl;
    return;
}

int lucky_number() {
    return 99;
}

int main()
{
    enter_bar(18);
    enter_bar(19);

    std::cout << max(3, 8) << std::endl;

    hello();

    std::cout << lucky_number() << std::endl;

    return 0;
}