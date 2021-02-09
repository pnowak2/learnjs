#include <iostream>
#include <cstring>
#include <cctype>

using namespace std;

int main() {
//    char first_name[20] {};
//    char last_name[20] {};
//    char full_name[20] {};
//    char temp[50] {};
    
//    cout << "Enter your first name: ";
//    cin >> first_name;
//    
//    cout << "Enter your last name: ";
//    cin >> last_name;
//    
//    cout << "-----" << endl;
//    
//    cout << "Hello, " << first_name << " your first name has " << strlen(first_name) << " characters" << endl;
//    cout << "and your last name, " << last_name << " has " << strlen(last_name) << " characters" << endl;
//    
//    strcpy(full_name, first_name); // copy first to full name
//    strcat(full_name, " ");
//    strcpy(full_name, last_name);
//    
//    cout << "Your full name is " << full_name << endl;
    
// ----
    
//    cout << "-----";
//    cout << "Enter your full name: ";
//    cin >> full_name;
//    
//    cout << "Your full name is " << full_name;
    
// ----

//    cout << "Enter your full name: ";
//    cin.getline(full_name, 50);
//    cout << "Your full name is " << full_name;
//    
//    strcpy(temp, full_name);
//    
//    if(strcmp(temp, full_name) == 0) {
//        cout << temp << " and " << full_name << " are the same" << endl;
//    } else {
//        cout << temp << " and " << full_name << " are different" << endl;
//    }
//    
//    for(size_t i {0}; i < strlen(full_name); i++) {
//        if(isalpha(full_name[i])) {
//            full_name[i] = toupper(full_name[i]);
//        }
//        cout << full_name[i] << endl;
//    }
//   
//      if(strcmp(temp, full_name) == 0) {
//        cout << temp << " and " << full_name << " are the same" << endl;
//    } else {
//        cout << temp << " and " << full_name << " are different" << endl;
//    }

        char first_name[20] {"Bjarne"};
        char last_name[20] {"Stroustrup"};
        char whole_name[50] {};
        
        int first_name_length = strlen(first_name);
        int last_name_length = strlen(last_name);
        
        strcpy(whole_name, first_name);
        strcat(whole_name, last_name);
        
        int whole_name_length = strlen(whole_name);
        
        cout << "first name: " << first_name << endl;
        cout << "last name: " << last_name << endl;
        cout << "whole name: " << whole_name_length << ", " << whole_name << endl;
        
        
    return 0;
}
