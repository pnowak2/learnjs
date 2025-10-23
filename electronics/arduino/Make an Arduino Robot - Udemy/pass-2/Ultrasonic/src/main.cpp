#include <HCSR04.h>
#define TRIG_PIN 3
#define ECHO_PIN 2
#define ECHO_INT 0

UltraSonicDistanceSensor distanceSensor(TRIG_PIN, ECHO_PIN);

void setup () {
    Serial.begin(9600);
}

void loop () {
    Serial.println(distanceSensor.measureDistanceCm());
    delay(500);
}