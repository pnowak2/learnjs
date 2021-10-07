#include <iostream>

using namespace std;

int main()
{
     int num {};

     cout << "enter an integer ";
     cin >> num;

     if(num % 2 == 0) {
         cout << num << " is even" << endl;
     } else {
         cout << num << " is odd";
     }

     cout << endl;

     cout << num << " is " << ((num % 2 == 0 ? "even" : "odd"));

    return 0;
}