#include <Arduino.h>

int button_pressed = 1;

void setup() {
  Serial.begin(9600);
}

void loop() {
  switch (button_pressed)
  {
  case 1:
    Serial.println("Option 1");
    break;
  case 2:
    Serial.println("Option 2");
    break;
  default:
    Serial.println("Default");
    break;
  }

  delay(500);
}