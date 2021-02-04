#include <iostream>
#include <vector>

using namespace std;

int main()
{
//    vector<char> vowels(0);
	vector<char> vowels { 'a', 'b', 'c'};

    cout << vowels[0] << endl;
    cout << vowels[1] << endl;

//    vector<int> test_scores(3);
//    vector<int> test_scores(3, 100);
    vector<int> test_scores {100, 200, 300};
    
    cout << test_scores[0] << endl;
    cout << test_scores[1] << endl;
    
    cout << test_scores.at(1) << endl;
    cout << test_scores.at(2) << endl;
    
    cout << "There are " << test_scores.size() << " items in vector" << endl;
    
//    cout << "Enter 3 test scores: ";
//    cin >> test_scores[0];
//    cin >> test_scores[1];
//    cin >> test_scores[2];
//    
//    cout << "\nUpdated test scores:" << endl;
//    
//    cout << test_scores.at(0) << endl;
//    cout << test_scores.at(1) << endl;
//    cout << test_scores.at(2) << endl;

    int score_to_add {0};
    cin >> score_to_add;
    
    test_scores.push_back(score_to_add);
    
    cout << "\nEnter one more score";
    
    cin >> score_to_add;
    
    test_scores.push_back(score_to_add);
    
    cout << "\n Test scores are now " << endl;
    
    cout << test_scores.at(1) << endl;
    cout << test_scores.at(2) << endl;
    cout << test_scores.at(3) << endl;
    cout << test_scores.at(4) << endl;
    
    cout << "There are " << test_scores.size() << " Items in score";
    
//    cout << "\nException test.." << endl;
//    test_scores.at(100);

    cout << "vector of vectors" << endl;
    
    vector<vector<int>> movie_ratings {
        { 1, 2, 3 },
        { 4, 5, 6},
        { 7, 8, 9 }
    };
    
    cout << "vector at row 3 item 2 " << endl;
    cout << movie_ratings.at(2).at(1);
    
	return 0;
}
