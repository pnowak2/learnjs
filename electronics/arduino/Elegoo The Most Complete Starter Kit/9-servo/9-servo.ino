#include "Servo.h"

Servo myservo;

void setup() {
  pinMode(8, INPUT_PULLUP);
  myservo.attach(9);
  myservo.write(90);
}

void loop() {
  myservo.write(90);
  delay(1000);

  myservo.write(30);
  delay(1000);

  myservo.write(90);
  delay(1000);

  myservo.write(150);
  delay(1000);
}
