#include <iostream>

int main()
{
    const char * const char_ptr1 {nullptr};
    const char * const char_ptr2 {nullptr};
    const char * const char_ptr3 {nullptr};

    const char * const char_arr[] {char_ptr1, char_ptr2, char_ptr3};

    // char_arr[0] = ""; // read only
    // char_arr[0] = char_ptr1; // read only

    const char * texts[] {
        "Hello",
        "World"
    };

    texts[0] = char_ptr1;

    const char * const texts_ptr[] {texts[0], texts[1]};

    return 0;
}