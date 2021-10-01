#include <iostream>

using namespace std;

int main() {
    double result = 2 * 5.2;
    int num = 10.2;

    int total_amount {100};
    int total_number {8};
    double average {0};

    average = total_amount / total_number;
    cout << "average: " << average << endl;

    average = static_cast<double>(total_amount) / total_number;
    cout << "average: " << average << endl;

    average = (double)total_amount / total_number;
    cout << "average: " << average << endl;

    return 0;
}