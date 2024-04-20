#include <Arduino.h>

const unsigned short int MIC_PIN = A0;
const unsigned short int LED_PIN = 7;
int currentValue;
int maxValue;
int minValue;
unsigned long timer;
unsigned long sampleSpan = 200; // ms to sample data, adjusted to hand clapping sound
int volume; // roughly from 0 to 700

void resetValues() {
  maxValue = 0;
  minValue = 1024;
  timer = millis();
}

void setup()
{
  Serial.begin(9600);
  pinMode(MIC_PIN, INPUT);
  pinMode(LED_PIN, OUTPUT);
  resetValues();
}

void loop()
{
  currentValue = analogRead(MIC_PIN);

  if(currentValue < minValue) {
    minValue = currentValue;
  }

  if(currentValue > maxValue) {
    maxValue = currentValue;
  }

  if(millis() - timer >= sampleSpan) {
    volume = maxValue - minValue;
    Serial.println(volume);
    resetValues();
  }

  if(volume > 50) {
    // Serial.println("Loud");
    digitalWrite(LED_PIN, HIGH);
  } else {
    // Serial.println("Quiet");
    digitalWrite(LED_PIN, LOW);
  }
}
