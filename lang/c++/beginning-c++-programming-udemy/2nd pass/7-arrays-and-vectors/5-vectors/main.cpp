#include <iostream>
#include <vector>

using namespace std;

int main()
{
    vector<char> vowels(5); // always initialize to zeros
    vector<double> scores(10); // always initialize to zeros

    vector<char> vowels_init{'a'};
    vector<double> scores_init{1, 2, 3};
    vector<double> scores_all_same(5, 17.62);

    cout << "vowels: " << vowels.at(0) << endl;
    cout << "vowels: " << vowels[0] << endl;
    cout << "scores: " << scores.at(0) << endl;
    cout << "scores: " << scores[0] << endl;
    cout << "vowels_init: " << vowels_init.at(0) << endl;
    cout << "vowels_init: " << vowels_init[0] << endl;
    cout << "scores_init: " << scores_init.at(0) << endl;
    cout << "scores_init: " << scores_init[0] << endl;
    cout << "scores_all_same: " << scores_all_same.at(0) << endl;
    cout << "scores_all_same: " << scores_all_same[0] << endl;

}