#include <Arduino.h>
#include <Servo.h>
#include <HCSR04.h>

#define TRIG_PIN 3
#define ECHO_PIN 2
#define ECHO_INT digitalPinToInterrupt(2) 

HC_SR04 sensor(TRIG_PIN, ECHO_PIN, ECHO_INT);

const int collisionThresh = 15; // treshold for obstacles (in cm). if less than this, stop robot and check other path.
int leftDistance, rightDistance; // distances on either side
Servo panMotor;

int ping() {
  sensor.start(); // start sensor to take measurements
  while(!sensor.isFinished()) {};
  return sensor.getRange();
}

void compareDistance() {
  if(leftDistance > rightDistance) {
    // more space on left side to go
    Serial.println("Left turn!");
    delay(500);
  } else if(rightDistance > leftDistance) {
    // more space on right side to go
    Serial.println("Right turn!");
  } else {
    // equal distance
    Serial.println("Turn back!");
    delay(1000);
  }
}

void setup() {
  Serial.begin(9600);

  panMotor.attach(6); // connect servo to pin 6
  panMotor.write(90); // center the pan servo

  sensor.begin(); // setup the sensor
  Serial.print("ECHOINT:");
  Serial.print(ECHO_INT);
  Serial.println();
}

void loop() {
  int distance = ping();

  Serial.print(distance);
  Serial.print("cm");
  Serial.println();

  if(distance > collisionThresh) {
    Serial.println("Forward, path clear!");
    delay(250);
  } else {
    panMotor.write(0);
    delay(500);
    leftDistance = ping(); // scan to the right
    Serial.print("Left distance: ");
    Serial.print(leftDistance);
    Serial.println();

    delay(500);

    panMotor.write(180);
    delay(700);
    rightDistance = ping(); // scan to the left
    Serial.print("Right distance: ");
    Serial.print(rightDistance);
    Serial.println();

    delay(500);
    panMotor.write(90); // return to center
    delay(100);

    compareDistance();
  }
}