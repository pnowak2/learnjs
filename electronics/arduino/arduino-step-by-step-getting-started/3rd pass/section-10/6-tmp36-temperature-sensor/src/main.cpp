#include <Arduino.h>

#define SENSOR_PIN A0

const int SUPPLY_VOLTAGE = 5;

void setup() {
  Serial.begin(9600);
}

void loop() {
  int value = analogRead(SENSOR_PIN);
  float voltage = (static_cast<float>(value) / 1024) * SUPPLY_VOLTAGE;
  float temperature = voltage * 100;
  Serial.println(temperature);

  delay(500);
}
