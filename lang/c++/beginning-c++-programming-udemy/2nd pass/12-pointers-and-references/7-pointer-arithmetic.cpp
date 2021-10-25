#include <iostream>
#include <iomanip>
#include <cctype>
#include <cstring>
#include <math.h>
#include <vector>

using namespace std;

int main()
{

    int scores[]{100, 95, 89, 68, -1};
    int *score_ptr{scores};

    while (*score_ptr != -1)
    {
        cout << *score_ptr << endl;
        score_ptr++;
    }

    cout << "--" << endl;
    score_ptr = scores;

    while (*score_ptr != -1)
    {
        cout << *score_ptr++ << endl; // first dereference to get value, then increase the pointer by 1 to get next int
    }

    cout << "--" << endl;

    string s1{"Frank"};
    string s2{"Frank"};
    string s3{"James"};

    string *p1{&s1};
    string *p2{&s2};
    string *p3{&s1};

    cout << boolalpha;

    cout << p1 << "==" << p2 << ": " << (p1 == p2) << endl;
    cout << p1 << "==" << p3 << ": " << (p1 == p3) << endl;
    cout << *p1 << "==" << *p3 << ": " << (*p1 == *p3) << endl;

    char name[]{'F', 'r', 'a', 'n', 'k'};
    char *ptr1{nullptr};
    char *ptr2{nullptr};

    ptr1 = &name[0];
    ptr2 = &name[2];

    cout << *ptr1 << endl;
    cout << *ptr2 << endl;
    cout << ptr2 - ptr1 << endl;

    return 0;
}