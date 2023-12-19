#include <Arduino.h>

const int TOTAL_STATES  = 10;

int ledState[TOTAL_STATES] {1, 0, 0, 0, 1, 0, 1, 0, 1, 0};
int duration[TOTAL_STATES] {20, 200, 200, 500, 500, 500, 200, 200, 200, 0};

void setup() {
  pinMode(LED_BUILTIN, OUTPUT);
}

void loop() {
  for(int i = 0; i< TOTAL_STATES; i++) {
    digitalWrite(LED_BUILTIN, ledState[i]);
    delay(duration[i]);
  }
} 
