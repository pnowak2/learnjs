#include "SR04.h"

#define TRIG_PIN 12
#define ECHO_PIN 11

SR04 sr04 = SR04(ECHO_PIN, TRIG_PIN);
long distance;

void setup() {
  Serial.begin(9600);
  delay(1000);
}

void loop() {
  distance = sr04.Distance();
  Serial.print(distance);
  Serial.println("cm");

  delay(1000);
}
