#include <iostream>

int main()
{
    char vowels[] {'a', 'e', 'i', 'o', 'u', 'y'}; // \0 is null termination string, in other case it prints garbage till another null character
    char message[] {"Quick brown fox jumps"};

    int vowelsCount {0};

    for(auto letter : message) {
        for(auto vowel : vowels) {
            if(letter == vowel) {
                vowelsCount++;
            }
        }
    }

    std::cout << "Vowels count: " << vowelsCount;

    return 0;
}