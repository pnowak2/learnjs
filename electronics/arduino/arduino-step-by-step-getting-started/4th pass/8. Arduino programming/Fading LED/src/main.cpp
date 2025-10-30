#include <Arduino.h>

#define LED_PIN 6 

void setup() {
  Serial.begin(9600);
  pinMode(A0, INPUT);
  pinMode(LED_PIN, OUTPUT);
}

void loop() {
  // 0 - 1023
  int potValue = analogRead(A0);
  float voltage = ((float)potValue / 1024) * 5;

  // analogWrite does only 0 - 255 range, need to map 
  int mappedValue = map(potValue, 0, 1023, 0, 255);
  analogWrite(LED_PIN, mappedValue);

  Serial.print(potValue);
  Serial.print(", ");
  Serial.print(voltage);
  Serial.println();

  delay(100);
}