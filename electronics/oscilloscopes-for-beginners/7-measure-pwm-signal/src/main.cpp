#include <Arduino.h>

const int servoPin {D9};
const int potPin {A0};
int brightness {0};

void setup() {
  pinMode(servoPin, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  brightness = map(analogRead(potPin), 0, 1000, 0, 255);
  analogWrite(servoPin, brightness);
  Serial.println(brightness);
  delay(50);
}