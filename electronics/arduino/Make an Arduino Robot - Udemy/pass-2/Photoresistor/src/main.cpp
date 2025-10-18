/**
 * Blink
 *
 * Turns on an LED on for one second,
 * then off for one second, repeatedly.
 */
#include "Arduino.h"

int leftSensorPin = A0;
int leftSensorValue = 0;
int rightSensorPin = A2;
int rightSensorValue = 0;

void setup()
{
  Serial.begin(9600);
}

void loop()
{
  leftSensorValue = analogRead(leftSensorPin);
  rightSensorValue = analogRead(rightSensorPin);
  Serial.print(leftSensorValue);
  Serial.print(", ");
  Serial.print(rightSensorValue);
  Serial.println();

  delay(10);
}