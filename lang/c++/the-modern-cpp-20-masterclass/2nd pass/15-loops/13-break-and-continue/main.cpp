#include <iostream>

int main(){
    for(size_t i{0}; i < 20; i++) {
        if(i == 6) {
            break;
        }
        std::cout << "i: " << i << std::endl;
    }

    std::cout << "Loop is done" << std::endl;
    
    for(size_t i{0}; i < 20; i++) {
        if(i == 6) {
            continue;
        }
        std::cout << "i: " << i << std::endl;
    }
}