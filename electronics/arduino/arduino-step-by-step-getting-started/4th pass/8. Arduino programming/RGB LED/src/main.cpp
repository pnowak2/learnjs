#include <Arduino.h>

#define RED_PIN 3
#define GREEN_PIN 5 
#define BLUE_PIN 6

void fadeLed(int ledPin) {
  for(int i = 0; i <= 255; i++) {
    analogWrite(ledPin, i);
    delay(4);
  }

  delay(4);

  for(int j = 255; j >= 0; j--) {
    analogWrite(ledPin, j);
    delay(4);
  }
}

void setup() {
  Serial.begin(9600);

  pinMode(RED_PIN, OUTPUT);
  pinMode(GREEN_PIN, OUTPUT);
  pinMode(BLUE_PIN, OUTPUT);
}

void loop() {
  fadeLed(RED_PIN);
  fadeLed(GREEN_PIN);
  fadeLed(BLUE_PIN);
}
