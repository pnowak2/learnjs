#include <Arduino.h>

char my_char[] {'a', 'b', 'c'};

void setup() {
  Serial.begin(9600);

  while(!Serial) {}

  Serial.println("Your array");

  for(int i {0}; i < 3; i++) {
    Serial.print("At ");
    Serial.print(i);
    Serial.print(": ");
    // Serial.print(static_cast<int>(my_char[i]));
    Serial.print(my_char[i], DEC);
    Serial.println();

    char sum = my_char[i] + my_char[i+1];
    Serial.print("Sum");
    Serial.println(sum);
  }
}

void loop() {

} 


