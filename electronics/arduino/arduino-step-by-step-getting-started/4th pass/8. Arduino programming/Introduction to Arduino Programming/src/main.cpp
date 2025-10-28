#include <Arduino.h>
#include <foo.cpp>

int sum(int a, int b) {
  return a + b;
}

void setup() {
  Serial.begin(9600);
  Serial.println("Hello World");
  Serial.println(domeSomeCalc());
  Serial.println(sum(7, 9));
}

void loop() {
  Serial.println(millis());
  delay(1000);
}
