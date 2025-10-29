#include <Arduino.h>
#include <foo.cpp>

int first_number {5};
int second_number = 9;

const int LED_PIN = 10;

int sum(int a, int b) {
  return a + b;
}

void setup() {

  first_number = 17;

  Serial.begin(9600);
  Serial.println("Hello World");
  Serial.println(domeSomeCalc(first_number, second_number));

  Serial.println(sum(7, 9));
}

void loop() {
  Serial.println(millis());
  delay(1000);
}
