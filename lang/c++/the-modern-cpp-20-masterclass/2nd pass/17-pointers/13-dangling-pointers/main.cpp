#include <iostream>

int main()
{
    // uninitialized pointer
    int * uninit_ptr;
    std::cout << uninit_ptr << std::endl;

    // deleted pointer
    int * deleted_ptr = new int {12};
    std::cout << deleted_ptr << ", " << *deleted_ptr << std::endl;
    delete deleted_ptr;
    std::cout << deleted_ptr << " (deleted), " << *deleted_ptr << std::endl;

    // multipointers pointing to same address
    int * multi_ptr1 {new int{64}};
    int * multi_ptr2 {multi_ptr1};

    std::cout << "ptr1: " << multi_ptr1 << ", " << *multi_ptr1 << std::endl;
    std::cout << "ptr2: " << multi_ptr2 << ", " << *multi_ptr2 << std::endl;

    delete multi_ptr1;
    multi_ptr1 = nullptr;

    // will crash, as pointing to delete address
    if(multi_ptr1 != nullptr) {
        std::cout << "ptr2: " << multi_ptr2 << "(deleted), " << *multi_ptr2 << std::endl;
    } else {
        std::cout << "ptr2 is nullptr" << std::endl;
    }

    return 0;
}