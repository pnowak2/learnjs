#include "Arduino.h"

#define SENSOR_PIN A2

void setup() {
  Serial.begin(9600);
  pinMode(SENSOR_PIN, INPUT);
}

void loop() {
  int rawValue = analogRead(SENSOR_PIN);
  float reading = rawValue * (1.0/1023);

  Serial.println(reading);
  delay(500);
}