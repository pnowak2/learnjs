#include <Arduino.h>

const int UV_PIN = A0;

void setup() {
  pinMode(A0, INPUT);
  Serial.begin(9600);
}

void loop() {
  int value = analogRead(UV_PIN);
  int voltage = value * (5 / 1023);

  Serial.println(voltage);
  delay(500);
}