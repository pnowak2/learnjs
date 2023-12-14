#include <Arduino.h>

unsigned short int buttonState = 0;

void setup() {
  pinMode(2, INPUT);
  pinMode(4, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  buttonState = digitalRead(2);
  if(buttonState == HIGH) {
    Serial.println("On");
    digitalWrite(4, HIGH);
  } else {
    Serial.println("Off");
    digitalWrite(4, LOW);
  }
}
