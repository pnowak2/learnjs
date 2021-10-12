#include <Arduino.h>

const unsigned short buttonPin = A3;
const unsigned short ledPin = A7;

void setup() {
  pinMode(ledPin, OUTPUT);
  pinMode(buttonPin, INPUT_PULLUP);
  digitalWrite(A7, LOW);
}

void loop() {
  const PinStatus status = digitalRead(buttonPin);

  if(status == LOW) {
    digitalWrite(ledPin, HIGH);
  } else {
    digitalWrite(ledPin, LOW);
  }
}