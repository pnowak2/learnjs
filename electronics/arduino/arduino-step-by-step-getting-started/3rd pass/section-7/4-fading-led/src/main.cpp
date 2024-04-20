#include <Arduino.h>

void setup() {
  Serial.begin(9600);
  pinMode(6, OUTPUT);
}

void loop() {
  int value = analogRead(A0);
  int lightness = map(value, 0, 1023, 0, 255);
  analogWrite(6, lightness);
}
