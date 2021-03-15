#include <Arduino.h>

struct Player {
  const char *name;
};

void setup() {
  Serial.begin(9600);
  pinMode(LED_BUILTIN, OUTPUT);
}

void loop() {
  digitalWrite(LED_BUILTIN, HIGH);
  Serial.println("Writing to led HIGH");
  delay(100);
  Serial.println("Writing to led LOW");
  digitalWrite(LED_BUILTIN, LOW);
  delay(100);
}