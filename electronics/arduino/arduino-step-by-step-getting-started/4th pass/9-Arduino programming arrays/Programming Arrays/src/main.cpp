#include <Arduino.h>

void setup() {

  Serial.begin(9600);

  char char_array[] = {'a', 'b', 'c'};
  char char_array2[5] {'a', 'b', 'c'};
  char char_array3[3] = "ab";

  char char_array4[5];

  int int_array[] = {1, 2, 3};
  int int_array2[3] = {1, 2, 3};

  const char* str {"hello world"};

  Serial.println(char_array);
  Serial.println(char_array2);
  Serial.println(char_array3);
  Serial.println(str);

  Serial.println(char_array2[1]);
  Serial.println(str[6]);
}

void loop() {
}