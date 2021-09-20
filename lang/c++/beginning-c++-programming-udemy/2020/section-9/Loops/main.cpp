#include <iostream>
#include <vector>

using namespace std;

int main()
{
    vector<int> vtr { 1, 2, 3 };
    int scores[] { 4, 5, 6 };

    for(int item : vtr) {
        cout << item << endl;
    }
    
    for(auto item : scores) {
        cout << static_cast<int>(item) << endl;
    }
    
    std::string str = "buba";
    
    for(char s : "hello") {
        cout << s << endl;
    }
    
    for(auto val : {7, 8, 9}) {
        cout << val << endl;
    }
    
    for(auto val : {1, 17, 46}) {
        cout << val;
    }
    return 0;
}
