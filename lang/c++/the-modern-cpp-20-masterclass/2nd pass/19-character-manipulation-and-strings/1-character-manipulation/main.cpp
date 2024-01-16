#include <iostream>

int main()
{
    std::cout << std::boolalpha;
    std::cout << std::isalnum('C') << std::endl;
    std::cout << std::isalnum('^') << std::endl;
    std::cout << std::isalnum(97) << std::endl;
    std::cout << std::isalnum('7') << std::endl;
    std::cout << std::isalnum(0) << std::endl;

    std::cout << "--" << std::endl;

    char msg[] {"Hello world, hi are you?"};
    int blank_count {};

    for(size_t i{0}; i < std::size(msg); i++) {
        if(std::isblank(msg[i])) {
            std::cout << "found blank character at index: " << i << std::endl;
            blank_count++;
        }
    }

    std::cout << "Found total " << blank_count << " blank characters";

    std::cout << "--" << std::endl;

    char msg2[] {"Hello world, Hi, how are You? Im gr8!"};
    int upper_count {};
    int lower_count {};
    int digit_count {};

    for(size_t i{0}; i < std::size(msg2); i++) {
        if(std::isupper(msg2[i])) {
            std::cout << "found upper case character at index: " << i <<": " << msg2[i] << std::endl;
            upper_count++;
        }
        if(std::islower(msg2[i])) {
            std::cout << "found lower case character at index: " << i <<": " << msg2[i] << std::endl;
            lower_count++;
        }
        if(std::isdigit(msg2[i])) {
            std::cout << "found digit character at index: " << i <<": " << msg2[i] << std::endl;
            digit_count++;
        }
    }

    std::cout << "Found total " << upper_count << " upper case characters";
    std::cout << "Found total " << lower_count << " lower case characters";
    std::cout << "Found total " << digit_count << " digit characters";

    std::cout << "--" << std::endl;

    char upper_msg[std::size(msg2)];
    for(size_t i{0}; i < std::size(msg2); i++) {
        upper_msg[i] = std::toupper(msg2[i]);
    }

    std::cout << upper_msg << std::endl;

    for(size_t i{0}; i < std::size(msg2); i++) {
        upper_msg[i] = std::tolower(msg2[i]);
    }

    std::cout << upper_msg << std::endl;

    std::cout << "--" << std::endl;

    char text[] {"Hello my friend"};
    size_t text_size = std::size(text);
    char *new_text = new char[text_size];

    for(size_t i{}; i < text_size; i++) {
        if(std::isspace(text[i])) {
            new_text[i] = '_';
        } else {
            new_text[i] = text[i];
        }
    }

    std::cout << new_text << std::endl;

    delete new_text;
    new_text = nullptr;

    return 0;
}