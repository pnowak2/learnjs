#include <iostream>

int main()
{
    int arr1[] {1, 2, 3};
    int arr2[] {4, 5, 6};

    int * p_temp {nullptr};
    int * p_arr1 {arr1};
    int * p_arr2 {arr2};

    p_temp = p_arr1;
    p_arr1 = p_arr2;
    p_arr2 = p_temp;

    std::cout << p_arr1[0] << std::endl;
    std::cout << p_arr1[1] << std::endl;
    std::cout << p_arr1[2] << std::endl;

    std::cout << p_arr2[0] << std::endl;
    std::cout << p_arr2[1] << std::endl;
    std::cout << p_arr2[2] << std::endl;
    return 0;
}