#include <iostream>
#include <bitset>

int static_var2{80};
int global_var1 {23};

void fn()
{
    global_var1;

    int local_var3{30};
    static int static_var1{40};
    int dynamic_var1{50};
}

int main()
{
    global_var1;

    int local_var1{10};
    int dynamic_var2{60};

    {
        int local_var2{20};
        int dynamic_var3{70};
    }
    return 0;
}