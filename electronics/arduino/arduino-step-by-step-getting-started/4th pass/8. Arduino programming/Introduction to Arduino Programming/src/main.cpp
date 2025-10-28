#include <Arduino.h>
#include <foo.cpp>

void setup() {
  Serial.begin(9600);
  Serial.println("Hello World");
  Serial.println(domeSomeCalc());
}

void loop() {
  Serial.println(millis());
  delay(1000);
}
