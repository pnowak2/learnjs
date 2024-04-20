#include <Arduino.h>

#define SENSOR_PIN A0

const float SUPPLY_VOLTAGE = 3.3;

void setup() {
  analogReference(EXTERNAL);
  Serial.begin(9600);
}

void loop() {
  int value = analogRead(SENSOR_PIN);
  float voltage = (static_cast<float>(value) / 1024) * SUPPLY_VOLTAGE; // 0 - 5V
  float temperature = voltage * 100; // LM35 gives 1 deg celsius per 10mV
  Serial.println(temperature);

  delay(500);
}
