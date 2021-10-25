#include <Arduino.h>
#include <Servo.h>

Servo myServo;
const int servoPin {9};
const int potPin {A0};
int pos {0};

void setup() {
  pinMode(servoPin, OUTPUT);
  myServo.attach(servoPin);
}

void loop() {
  pos = map(analogRead(potPin), 0, 1023, 0, 255);
  myServo.write(pos);
}