#include <Arduino.h>


void setup()
{
  Serial.begin(9600);
  pinMode(LED_BUILTIN, OUTPUT);

  while(!Serial);
}

void longBlink() {
    digitalWrite(LED_BUILTIN, HIGH);
    delay(500);
    digitalWrite(LED_BUILTIN, LOW);
    delay(500);
}

void shortBlink() {
    digitalWrite(LED_BUILTIN, HIGH);
    delay(150);
    digitalWrite(LED_BUILTIN, LOW);
    delay(150);
}

void signals() {
  int blinks [] {1, 1, 1, 0 ,0, 0, 1, 1, 1};
  int total = sizeof(blinks) / sizeof(blinks[0]);

  for(int i = 0; i < total; i++) {
    if(blinks[i] == 1) {
      shortBlink();
    } else if (blinks[i] == 0) {
      longBlink();
    }
  }
}

void loop()
{
  signals();
  delay(2000);
}