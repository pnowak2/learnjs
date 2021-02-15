#include "mylib.h"
#include <string>
#include <cctype>

bool isPositive(int num) {
    return num >= 0;
}

int countPositives(std::vector<int> const& inputVector) {
    return std::count_if(inputVector.begin(), inputVector.end(), isPositive);
}

void toUpper(char *inputString) {
    for(unsigned i = 0; i < strlen(inputString); i++) {
        inputString[i] = toupper(inputString[i]);
    }
}