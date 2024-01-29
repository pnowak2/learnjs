#include <Arduino.h>

const unsigned short int TRIG_PIN {13};
const unsigned short int ECHO_PIN {12};

void setup()
{
  Serial.begin(9600);
  pinMode(TRIG_PIN, OUTPUT);
  pinMode(ECHO_PIN, INPUT);
}
void loop()
{
  long duration;
  long distance;

  digitalWrite(TRIG_PIN, LOW);
  delayMicroseconds(2);
  digitalWrite(TRIG_PIN, HIGH);
  delayMicroseconds(10);
  digitalWrite(TRIG_PIN, LOW);

  duration = pulseIn(ECHO_PIN, HIGH);
  distance = (duration / 2) / 29.1;

  if(distance > 200 || distance <=0) {
    Serial.println("out of range");
  } else {
    Serial.print(distance);
    Serial.println("cm");
  }

  delay(250);
}