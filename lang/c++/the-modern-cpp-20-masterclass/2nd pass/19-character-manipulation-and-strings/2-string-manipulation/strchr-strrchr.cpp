#include <iostream>
#include <cstring>

int main()
{
    const char *message {"Hello world"};
    const char *ptr = std::strchr(message, 'l');

    // returns pointer to character found (so can be printed as string from this character)
    std::cout << "strchr: " << ptr << std::endl;
    std::cout << static_cast<const void*>(&message[2]) << ": " << static_cast<const void*>(ptr) << std::endl;

    // strrchr -- find last occurence --

    const char *path {"/home/users/pnowak/config.txt"};
    const char separator {'/'};

    std::cout << "File name is: " << std::strrchr(path, separator) + 1; // +1 as we dont want the separator to be included actually

    return 0;
}