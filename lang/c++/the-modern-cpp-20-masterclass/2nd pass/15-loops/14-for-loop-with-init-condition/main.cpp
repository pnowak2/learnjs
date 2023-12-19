#include <iostream>

int main(){
    for(auto multiplier {4}; auto x : { 1, 2, 3 }) {
        std::cout << x * multiplier << std::endl;
    }
}