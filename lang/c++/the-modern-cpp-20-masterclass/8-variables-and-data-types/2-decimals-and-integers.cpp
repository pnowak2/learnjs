#include <iostream>

int main () {
    int elephant_count;
    int lion_count {};
    int dog_count {10};
    int cat_count {15};
    int ants (5); // functional initialization

    int truncated (5.9);
    int another_trunc = 7.6;
    // int truncated_init { 5.9 }; // wont compile, narrowing conversion error

    int animals {dog_count + cat_count};

    std::cout << truncated << std::endl;
    std::cout << another_trunc << std::endl;

    std::cout << sizeof(elephant_count) << std::endl;

    return 0;
}