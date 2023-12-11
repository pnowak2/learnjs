#include <iostream>

int main()
{
    // will be already baked in binary as its done in compile time
    constexpr int SOME_VERSION { 123 };
    constexpr int eye_count{2};
    constexpr double PI {3.14};

    const int table_count {6};
    constexpr int chair_count { table_count * 5};

    static_assert(chair_count == 30);

    return 0;
}