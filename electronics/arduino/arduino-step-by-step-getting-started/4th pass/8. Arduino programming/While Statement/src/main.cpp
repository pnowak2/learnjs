#include <Arduino.h>

int counter = 0;

void setup() {
  Serial.begin(9600);
}

void loop() {
  while(counter < 10) {
    Serial.println("Counting to 10");
    counter += 1;
  }

  Serial.println("Stopped counting");
  delay(500);

}