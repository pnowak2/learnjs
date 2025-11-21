#include <Arduino.h>

#define PHOTORESISTOR_PIN A0

void setup()
{
  Serial.begin(9600);

  pinMode(PHOTORESISTOR_PIN, INPUT);

  while (!Serial)
    ;
}

void loop()
{
  int value = analogRead(PHOTORESISTOR_PIN);
  float voltage = value * (5.0 / 1023.0);

  Serial.println(voltage);

  delay(200);
}