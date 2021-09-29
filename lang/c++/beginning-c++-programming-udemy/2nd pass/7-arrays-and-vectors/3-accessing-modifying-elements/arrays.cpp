#include <iostream>

using namespace std;

int main()
{
    char vowels[]{'a', 'e', 'i', 'o', 'u'};
    cout << "\nFirst vowel is: " << vowels[0] << endl;
    cout << "\nthe last vowel is: " << vowels[4] << endl;

    // cin >> vowels[5]; // can crash, out of bounds

    double temps[] { 90.1, 89.8, 77.5};
    cout << "\nFirst temperature is: " << temps[0] << endl;
    temps[0] = 120.2;
    cout << "\nFirst temperature is now: " << temps[0] << endl;

    int scores[5];
    cout << "\nScore 0: " << scores[0];
    cout << "\nScore 1: " << scores[1];
    cout << "\nScore 2: " << scores[2];
    cout << "\nScore 3: " << scores[3];
    cout << "\nScore 4: " << scores[4];

    cout << "Scores array (memory address): " << scores << endl;
    cout << "Scores first array item (memory address): " << &scores[0] << endl;


    return 0;
}