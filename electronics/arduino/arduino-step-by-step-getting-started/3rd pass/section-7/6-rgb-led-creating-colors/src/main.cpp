#include <Arduino.h>

#define RED_PIN 3 
#define GREEN_PIN 5 
#define BLUE_PIN 6 

void setup() {
  pinMode(RED_PIN, OUTPUT);
  pinMode(GREEN_PIN, OUTPUT);
  pinMode(BLUE_PIN, OUTPUT);
}

void loop() {
  analogWrite(GREEN_PIN, 10);
  analogWrite(RED_PIN, 60);
  analogWrite(BLUE_PIN, 80);
}
