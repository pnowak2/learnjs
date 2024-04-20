#include <Arduino.h>
#include <Wire.h>

enum Color {
  RED, GREEN, BLUE
};

void light(Color color, int intensity) {
  int reversed = intensity - 255;
  switch (color)
  {
    case RED:
      analogWrite(3, reversed);
      analogWrite(5, 0);
      analogWrite(6, 0);
    break;
    case GREEN:
      analogWrite(5, 0);
      analogWrite(5, reversed);
      analogWrite(6, 0);
      break;
    case BLUE:
      analogWrite(6, 0);
      analogWrite(5, 0);
      analogWrite(6, reversed);
    break;
  
  default:
    break;
  }
}

void setup() {
  Serial.begin(9600);
  pinMode(A0, INPUT);
  pinMode(3, OUTPUT);
  pinMode(5, OUTPUT);
  pinMode(6, OUTPUT);
}

void loop() {
  int sensorValue = analogRead(A0);

  if(sensorValue > 700) {
    light(RED, map(sensorValue, 700, 1024, 0, 255));
  } else if(sensorValue > 300 && sensorValue < 699) {
    light(BLUE, map(sensorValue, 300, 699, 0, 255));
  } else {
    light(GREEN, map(sensorValue, 0, 299, 0, 255));
  }
} 


