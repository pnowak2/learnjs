#include <Arduino.h>

int sensorPin = A2;
int sensorValue = 0;

void setup() {
  Serial.begin(9600);
}

void loop() {
  sensorValue = analogRead(A2);
  Serial.println(sensorValue);
  delay(10);
}