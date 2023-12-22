#include <iostream>
#include <ctime>

int main()
{
    bool end {false};
    const int MAX_LENGTH {15};
    char name[MAX_LENGTH] {};

    std::cout << "Your name: " << std::endl;
    std::cin.getline(name, MAX_LENGTH);

    char prediction0[] {"Luck"};
    char prediction1[] {"Love"};
    char prediction2[] {"Hapiness"};

    std::srand(std::time(0));

    while(!end) {

        std::cout << "Dear " << name << ", I see ";
        int rand = std::rand() % 3;

        switch(rand) {
            case 0:
                std::cout << prediction0 << "(" << rand << ")" << std::endl;
                break;
            case 1:
                std::cout << prediction1 << "(" << rand << ")" << std::endl;
                break;
            case 2:
                std::cout << prediction2 << "(" << rand << ")" << std::endl;
                break;
        }

        std::cout << "Try again ? (y / n): ";

        char go_on {};
        std::cin >> go_on;

        end = go_on == 'y' ? false : true;
    }

    return 0;
}