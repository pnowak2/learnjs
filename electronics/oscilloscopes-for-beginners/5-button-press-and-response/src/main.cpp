#include <Arduino.h>

void setup() {
  pinMode(A7, OUTPUT);
  pinMode(A3, INPUT_PULLUP);
  digitalWrite(A7, LOW);
}

void loop() {
  // put your main code here, to run repeatedly:
  const PinStatus status = digitalRead(A3);
  if(status == LOW) {
    digitalWrite(A7, HIGH);
  } else {
    digitalWrite(A7, LOW);
  }
}