#include <Arduino.h>
#include <control-structures.cpp>

short counter = 32760;

void setup() {
  Serial.begin(9600);
}

void loop() {
  if(counter < 10) {
    Serial.print(counter);
    Serial.print(", ");
    Serial.println("Smaller than 10");
  } else {
    Serial.print(counter);
    Serial.print(", ");
    Serial.println("Bigger than 10");
  }
  delay(500);
  counter += 1;
}