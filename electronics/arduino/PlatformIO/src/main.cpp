#include <Arduino.h>

void setup() {
  Serial.begin(9600);
  pinMode(A2, INPUT);
  pinMode(7, OUTPUT);
}

void loop() {
  int level = analogRead(A2);
  // Serial.println(level);
  // delay(500);

  if(level < 400) {
    digitalWrite(7, HIGH);
  } else {
    digitalWrite(7, LOW);
  }
  
}