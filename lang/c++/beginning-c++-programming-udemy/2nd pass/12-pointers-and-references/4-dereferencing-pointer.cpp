#include <iostream>
#include <iomanip>
#include <cctype>
#include <cstring>
#include <math.h>
#include <vector>

using namespace std;

int main()
{
    int score {10};
    int *score_ptr {nullptr};
    score_ptr = &score;

    cout << "Dereference Value of score pointer is: " << *score_ptr << endl;

    double temp { 150.22 };
    double *temp_ptr {&temp};

    cout << "Dereference Value of temp pointer is: " << *temp_ptr << endl;

    temp = 18.46;

    cout << "Dereference Value of temp pointer is: " << *temp_ptr << endl;
    
    double other_temp { 0.16 };
    temp_ptr = &other_temp;
    
    cout << "Dereference Value of temp pointer is: " << *temp_ptr << endl;

    vector<string> stooges { "Larry", "Moe", "Curly" };
    vector<string> *vector_ptr {&stooges};

    for(auto item : *vector_ptr) {
        cout << "item: " << item << endl;
    }


    return 0;
}