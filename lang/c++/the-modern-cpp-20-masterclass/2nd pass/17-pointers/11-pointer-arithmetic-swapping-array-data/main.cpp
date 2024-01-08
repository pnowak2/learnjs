#include <iostream>

int main()
{
    int arr0[]{1, 2, 3, 4, 5};
    int arr1[]{5, 6, 7, 8, 9};

    int *ptr_arr0{arr0};
    int *ptr_arr1{arr1};

    int * ptr_temp;

    ptr_temp = ptr_arr0;
    ptr_arr0 = ptr_arr1;
    ptr_arr1 = ptr_temp;

    for(size_t i; i < std::size(arr0); i++) {
        std::cout << *(ptr_arr0 + i) << std::endl;
    }

    for(size_t j; j < std::size(arr1); j++) {
        std::cout << *(ptr_arr1 + j) << std::endl;
    }

    return 0;
}