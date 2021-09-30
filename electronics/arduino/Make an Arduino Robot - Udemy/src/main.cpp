#include <Arduino.h>

int leftSensorPin = A2;
int leftSensorValue = 0;
int rightSensorPin = A0;
int rightSensorValue = 0;

void setup() {
  Serial.begin(9600);
}

void loop() {
  leftSensorValue = analogRead(leftSensorPin);
  rightSensorValue = analogRead(rightSensorPin);
  Serial.print(leftSensorValue);
  Serial.print(", ");
  Serial.print(rightSensorValue);
  Serial.println();
  delay(100);
}