#include <iostream>

int main()
{
    std::string message {"hello"};
    std::string copied {message};

    char * m_ptr = message.data();
    const char * c_ptr = copied.c_str();
    char * c_ptr2 = copied.data();

    std::cout << (void *)m_ptr << std::endl;
    std::cout << (void *)c_ptr << std::endl;
    std::cout << (void *)c_ptr2 << std::endl;

    // reference

    std::string& message_ref = message;
    std::cout << message_ref << std::endl;
    std::cout << &message << ": " << &message_ref << std::endl;

    return 0;
}