#include <Arduino.h>

#define LED_PIN 8

void shortBlink() {
  digitalWrite(LED_PIN, HIGH);
  delay(100);
  digitalWrite(LED_PIN, LOW);
  delay(100);
}

void longBlink() {
  digitalWrite(LED_PIN, HIGH);
  delay(200);
  digitalWrite(LED_PIN, LOW);
  delay(200);
}

void setup() {
  pinMode(LED_PIN, OUTPUT);
}

void loop() {
  shortBlink();
  shortBlink();
  shortBlink();
  longBlink();
  longBlink();
  longBlink();
  shortBlink();
  shortBlink();
  shortBlink();

  delay(3000);
}
