#include <iostream>
#include <iomanip>
#include <cctype>
#include <cstring>
#include <string>

using namespace std;

void declare()
{
    string s1;
    s1 = "C++ rocks!";

    string s2{"Piotr"};
    string s3{s2};
    string s4{"Piotr", 3};
    string s5{s2, 0, 2};
    string s6{3, 'X'};
    string s7 = s1;

    cout << s1 << endl;
    cout << s2 << endl;
    cout << s3 << endl;
    cout << s4 << endl;
    cout << s5 << endl;
    cout << s6 << endl;
    cout << s7 << endl;

    cout << &s1 << endl;
    cout << &s7 << endl;
}

void concatenate()
{
    string part1{"C++"};
    string part2{"is a powerful"};

    string sentence;

    sentence = part1 + " " + part2 + " language";
    cout << sentence << endl;

    // string result = "c++ " + "is nice"; // invalid, since two c-style literals
    // cout << result << endl;
}

void accessingCharacters()
{
    string s{"hello world"};
    cout << s[4] << endl;
    s[0] = 'b';
    cout << s.at(4) << endl;
    cout << s << endl;
}

void iterateOverString()
{
    string s{"Piotr"};

    for (auto c : s)
    {
        cout << c << "-";
    }

    cout << endl;

    for (int c : s)
    {
        cout << c << "-";
    }

    cout << endl;
}

void comparison()
{
    string s1{"Apple"};
    string s2{"Banana"};
    string s3{"Kiwi"};
    string s4{"apple"};
    string s5{s1};

    cout << boolalpha << (s1 == s5) << endl;
    cout << (s1 == s2) << endl;
    cout << (s1 != s2) << endl;
    cout << (s1 < s2) << endl;
    cout << (s2 > s1) << endl;
    cout << (s4 < s5) << endl;
    cout << (s1 == "Apple") << endl; // comparison with c-style literal
}

void substr()
{
    string s{"Piotr"};
    cout << s.substr(0, 3) << endl;
    cout << s.substr(3, 5) << endl;
}

void find()
{
    string s{"Piotr Nowak"};
    cout << s.find("tr") << endl;
    cout << s.find('r') << endl;
    cout << s.find('o') << endl;
    cout << s.find('o', 5) << endl; // start looking from index 5

    auto pos = s.find('o');
    if(pos != string::npos) {
        cout << "found!" << endl;
    }
}

void insert()
{
    string s{"Piotr Nowak"};
    s.insert(5,"|");

    cout << s << endl;

}

void erase()
{
    string s{"Piotr Nowak"};
    cout << s.erase(2, 4) << endl;

    s.clear();
    cout << s << endl;
}

void length() {
    string s {"Piotr"};

    cout << s.length() << endl;
}

void concatentate() {
    string s {"Piotr"};
    s += " Nowak";

    cout << s << endl;
}

void readAllLine() {
    string s{};
    cout << "Your name: ";
    getline(cin, s);

    cout << s << endl;
}

void swap() {
    string first {"Piotr"};
    string last {"Nowak"};

    cout << first << " " << last << endl;
    first.swap(last);
    cout << first << " " << last << endl;
}

int main()
{
    declare();
    concatenate();
    accessingCharacters();
    iterateOverString();
    comparison();
    substr();
    find();
    erase();
    length();
    concatenate();
    readAllLine();
    insert();
    swap();

    return 0;
}