#include <iostream>
#include <iomanip>
#include <cctype>
#include <cstring>
#include <math.h>
#include <vector>

using namespace std;

void print(int);
void print(double);
void print(string);
void print(string, string);
void print(vector<string>);

void print(int num) {
    cout << num << endl;
}

void print(double num) {
    cout << num << endl;
}

void print(string str) {
    cout << str << endl;
}

void print(string str, string str2) {
    cout << str << str2 << endl;
}

void print(vector<string> lst) {
    for(auto item : lst) {
        cout << item << ", ";
    }

    cout << endl;
}


int main()
{
    print(5);
    print(5.15f);
    print("buba");
    print("buba", "buba");
    print(vector<string>{ "hey", "ho" });

    return 0;
}