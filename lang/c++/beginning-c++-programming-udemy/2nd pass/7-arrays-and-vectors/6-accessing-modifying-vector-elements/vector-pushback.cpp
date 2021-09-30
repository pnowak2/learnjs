#include <iostream>
#include <vector>

using namespace std;

int main()
{
    vector<char> vowels {'a', 'e', 'i'};
    cout << vowels[0] << endl;
    cout << vowels[2] << endl;

    vector<double> scores {1, 2, 3};
    cout << scores[0] << endl;
    cout << scores.at(1) << endl; // bounds check
    cout << scores[2] << endl;

    cout << "Provide 3 scores: ";
    cin >> scores[0] >> scores[1] >> scores[2];

    cout << scores[0] << endl;
    cout << scores.at(1) << endl; // bounds check
    cout << scores[2] << endl;

    double score_to_add = 5.64;

    scores.push_back(score_to_add);

    cout << "size of scores: " << scores.size() << endl;
    cout << scores[0] << endl;
    cout << scores.at(1) << endl; // bounds check
    cout << scores[2] << endl;
    cout << scores[3] << endl;

    cout << "size of scores: " << scores.size() << endl;
}