#include <iostream>

using namespace std;

int main()
{
    enum Direction {
        Top = 1, Down
    };
    
    Direction dir { Top };
    
	int num {};
    char letter { 'a' };
    
    const int min {10};
    const int max {100};

    cout << "Enter number between " << min << " and " << max <<": ";
    
//    cin >> num;
    
    if(num > 10) {
        cout << num << " is greater than " << min << endl;
    }
    
    cout << endl;
    
    switch(num) {
        case 1:
            cout << "provided one" << endl;        
            break;

        case 2:
            break;
        default:
            cout << "default";
            
    }
    
    switch(letter) {
        case 'a':
            cout << "boo";
    }
    
    switch(dir) {
        case Top: 
            cout << "top" << endl;
    }
	return 0;
}
