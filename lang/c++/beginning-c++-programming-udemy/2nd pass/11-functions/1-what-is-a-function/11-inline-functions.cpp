#include <iostream>
#include <iomanip>
#include <cctype>
#include <cstring>
#include <math.h>
#include <vector>

using namespace std;

/*
 * Instruct compiler not to call that function, avoid call cycle, rather inline it
 */
inline void inline_example() {
}

int main()
{
    inline_example();

    return 0;
}