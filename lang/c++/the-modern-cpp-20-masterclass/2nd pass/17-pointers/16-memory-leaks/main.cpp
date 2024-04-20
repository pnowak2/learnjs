#include <iostream>

int main()
{
    int *p_number {new int{67}};
    int number {55};

    p_number = &number; // memory leak, 67 is dangling..

    int *p_number1 {new int{68}};
    p_number1 = new int{44}; // memory leak, lost pointer to 68..

    {
        int *p_number2 {new int{57}};
    }

    // memory leak, lost access to pointer..
    return 0;
}