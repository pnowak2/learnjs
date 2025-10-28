#include <Arduino.h>

void setup() {
  Serial.begin(9600);
  Serial.println("Hello World");
  Serial.print("Hello Again");
}

void loop() {
  Serial.println(millis());
  Serial.println(micros());
  delay(1000);
}