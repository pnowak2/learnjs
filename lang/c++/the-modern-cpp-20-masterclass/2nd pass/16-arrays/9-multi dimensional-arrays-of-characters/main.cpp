#include <iostream>

int main()
{
    const size_t length {15};

    char words [][length] {
        {'H', 'e', 'l', 'l', 'o'},
        {'w', 'o', 'r', 'l', 'd'},
        {"Another one"},
        // {"This is really more than 15 characters"}, // wont compile, more than 15 characters
    };

    for(size_t i {0}; i < std::size(words); i++) {
        std::cout << words[i] << std::endl;
    };
}