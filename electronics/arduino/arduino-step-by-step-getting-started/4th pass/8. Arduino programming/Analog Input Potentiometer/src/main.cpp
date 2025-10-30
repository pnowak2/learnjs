#include <Arduino.h>

void setup() {
  Serial.begin(9600);
  pinMode(A0, INPUT);
}

void loop() {
  int potValue = analogRead(A0);
  float voltage = ((float)potValue / 1024) * 5;

  Serial.print(potValue);
  Serial.print(", ");
  Serial.print(voltage);
  Serial.println();

  delay(100);
}