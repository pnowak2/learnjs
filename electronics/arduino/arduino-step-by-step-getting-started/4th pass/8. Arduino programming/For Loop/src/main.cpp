#include <Arduino.h>

void setup() {
  Serial.begin(9600);
}

void loop() {
  for(int counter; counter < 10; counter++) {
    Serial.print(counter);
    delay(50);
  }

  Serial.println("Done counting");
  delay(500);
}