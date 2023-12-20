#include <Arduino.h>
#include <Wire.h>
#include "Adafruit_TCS34725.h"

Adafruit_TCS34725 tcs;

void setup() {
  Serial.begin(9600);

  if(tcs.begin()) {
    // all ok, found sensor
  } else {
    while(1); // halt
  }
}

void loop() {
  uint16_t clear, red, green, blue;
  tcs.setInterrupt(false);

  delay(60);

  tcs.getRawData(&red, &green, &blue, &clear);

  tcs.setInterrupt(true);

  Serial.print(red);
  Serial.print(green);
  Serial.print(blue);
  Serial.print(clear);
  Serial.println();
} 


