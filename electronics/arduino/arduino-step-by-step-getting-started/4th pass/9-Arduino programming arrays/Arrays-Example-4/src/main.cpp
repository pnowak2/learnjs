#include <Arduino.h>


void setup()
{
  Serial.begin(9600);
  pinMode(LED_BUILTIN, OUTPUT);

  char input = Serial.read();
  Serial.print("Input: ");
  Serial.println(input);

  while(!Serial);
}

void blink(int state, int duration) {
    delay(duration);
    digitalWrite(LED_BUILTIN, state);
    delay(duration);
}

void signals() {
  int states [] {1, 1, 1, 0 ,0, 0, 1, 1, 1};
  int durations [] {100, 500, 200, 400, 50, 50, 50, 100, 300};
  int total = sizeof(states) / sizeof(states[0]);

  for(int i = 0; i < total; i++) {
    blink(states[i], durations[i]);
  }
}

void loop()
{
  signals();
  delay(2000);
}