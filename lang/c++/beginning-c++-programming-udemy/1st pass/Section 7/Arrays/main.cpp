#include <iostream>

using namespace std;

int main()
{
	char vowels[] { 'a', 'e', 'i', 'o', 'u', 'y' } ;
    
    cout << "The first vowel is: " << vowels[0] << endl;
    cout << "The last vowel is: " << vowels[5] << endl;
    
//    cin >> vowels[6]; // don't do this, out of bounds!
    
    //--
    
    double hi_temps[] {90.1, 89.8, 77.5, 81.6};
    cout << "The first high temperature is: " << hi_temps[0] << endl;
    
    hi_temps[0] = 100.7;
    
    cout << "The first high temperature is now: " << hi_temps[0] << endl;
    
    //--
    
    int test_scores[] { 100, 90, 80, 70, 60 };
    
    cout << "First score at index 0: " << test_scores[0] << endl;
    cout << "2nd score at index 1: " << test_scores[1] << endl;
    cout << "3rd score at index 2: " << test_scores[2] << endl;
    cout << "4th score at index 3: " << test_scores[3] << endl;    
    cout << "5th score at index 4: " << test_scores[4] << endl;
    
    cout << "Enter scores" << endl;
    
    cin >> test_scores[0];    
    cin >> test_scores[1];
    cin >> test_scores[2];
    cin >> test_scores[3];
    cin >> test_scores[4];
    
    cout << "First score at index 0: " << test_scores[0] << endl;
    cout << "2nd score at index 1: " << test_scores[1] << endl;
    cout << "3rd score at index 2: " << test_scores[2] << endl;
    cout << "4th score at index 3: " << test_scores[3] << endl;    
    cout << "5th score at index 4: " << test_scores[4] << endl;
    
    cout << "Notice the value of the array name: " << test_scores;
    
    int movie_array[2][3]{
        { 1, 2, 3 },
        { 4, 5, 6 },
    };
	return 0;
}
