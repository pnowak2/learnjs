#include <iostream>
#include <iomanip>
#include <ios>

int main()
{
    // std::endl
    std::cout << "hello\n";
    std::cout << "hello\n"
              << std::endl;

    // std::flush
    std::cout << "Hi" << std::endl
              << std::flush;

    // std::setw and related
    std::cout << std::left;
    std::cout << std::setfill('-');

    std::cout << std::setw(10) << "Hello" << std::endl;
    std::cout << std::setw(10) << "My dear friend" << std::endl;
    std::cout << std::setw(10) << -24 << std::endl;
    std::cout << std::internal << std::setw(10) << -24 << std::endl;

    std::cout << std::boolalpha << true << std::endl;
    std::cout << std::noboolalpha << true << std::endl;

    std::cout << std::showpos << 24 << std::endl;
    std::cout << std::noshowpos << 24 << std::endl;

    std::cout << std::hex << 15 << std::endl;
    std::cout << std::oct << 8 << std::endl;

    std::cout << std::uppercase << "hello" << std::endl;
    std::cout << std::nouppercase << "HELLO" << std::endl;

    std::cout << std::setprecision(3) << 3.14525345 << std::endl;
    std::cout << std::scientific << 3.14525345 << std::endl;

    std::cout << std::showpoint << 12.0 << std::endl;
    std::cout << std::noshowpoint << 12.0 << std::endl;

    return 0;
}