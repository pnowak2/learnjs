#include <Arduino.h>

void setup() {
  Serial.begin(9600);
  pinMode(A0, INPUT);
}

void loop() {
  unsigned int sensorValue = analogRead(A0);
  Serial.println(sensorValue);
  delay(10);
} 


