#include <iostream>

using namespace std;

int main() {
    int counter {10};
    int result {0};
    
    int amount {100};
    int number { 8 };
    
    double average {0.0};
    
    average = static_cast<double>(amount)/number;
    
    cout << average << endl;
    
    return 0;
}
