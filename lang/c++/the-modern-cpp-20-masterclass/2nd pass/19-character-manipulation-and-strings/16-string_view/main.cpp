#include <iostream>

int main()
{
    std::string string {"hello"};
    // complete copies of string, waste
    std::string string1 {string}; // view of hello
    std::string string2 {string}; // view of hello

    std::cout << &string << std::endl;
    std::cout << &string1 << std::endl;
    std::cout << &string2 << std::endl;

    /* Viewing */
    // helps avoiding making copies of existing strings => memory saver
    // can use all string familiar methods, but only for read, not write purposes
    // making the view to existing string
    // avoid viewing non null terminated strings

    std::string_view sv {"hello"};
    std::string_view sv1 {sv};
    std::string_view sv2 {sv};

    std::cout << &sv << std::endl;
    std::cout << &sv1 << std::endl;
    std::cout << &sv2 << std::endl;

    // can initialize string_view from cstring, char arrays etc

    // changes to source string are visible by string_view all the time
    char word [] {"Dog"};
    std::string_view sv_dog {word};
    word[2] = 't';
    std::cout << sv_dog << std::endl;

    // string_view window change, view does not affect original string
    const char * c_string1 {"the animals have left the region"};
    std::string_view sv3 {c_string1};

    std::cout << sv3 << std::endl;
    sv3.remove_prefix(4); // sets region to start on idx 4 of original string
    std::cout << sv3 << std::endl;
    std::cout << c_string1 << std::endl;
    sv3.remove_suffix(10);
    std::cout << sv3 << std::endl;

    // can ask for char array with data()

    std::cout << sv3.data() << std::endl;


    return 0;
}