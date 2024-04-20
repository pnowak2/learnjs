#include <iostream>
#include <cstring>
#include <string>

int main()
{
    std::string full_name;
    std::string planet {"earth"};
    std::string preferred_planet {planet};
    std::string message {"hello world", 5}; // just "hello"

    std::string only_es {4, 'e'}; // init with 4 e's
    std::string partial_message {planet, 2, 3}; // range from 2 index and long for 3 chars

    std::cout << full_name << std::endl;
    std::cout << planet << std::endl;
    std::cout << preferred_planet << std::endl;
    std::cout << message << std::endl;
    std::cout << only_es << std::endl;
    std::cout << partial_message << std::endl;

    std::cout << std::size(planet) << std::endl;
    std::cout << planet.size() << std::endl;

    planet = "hello very long world";
    std::cout << planet << std::endl;
    std::cout << planet.size() << std::endl;
    

    return 0;
}