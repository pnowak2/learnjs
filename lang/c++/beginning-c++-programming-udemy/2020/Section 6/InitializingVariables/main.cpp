#include <iostream>

using namespace std;

int main() {
    string name;
    
    cout << "Enter the width of the room: ";
    int width {0};
    cin >> width;
    
    cout << "Enter the length of the room: ";
    int length {0};    
    cin >> length;
    
    cout << "The area of the room is: " << width * length << " square meteters" << endl;
    
    return 0;
}
