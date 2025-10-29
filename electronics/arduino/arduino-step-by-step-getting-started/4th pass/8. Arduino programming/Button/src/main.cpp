#include <Arduino.h>

void setup() {
  Serial.begin(9600);
  pinMode(2, INPUT);
  pinMode(LED_BUILTIN, OUTPUT);
}

void loop() {
  int value = digitalRead(2);
  Serial.println(value);

  if(value == 1) {
    digitalWrite(LED_BUILTIN, HIGH);
  } else {
    digitalWrite(LED_BUILTIN, LOW);
  }

  delay(500);
}