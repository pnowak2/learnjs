#include <Arduino.h>
#include <AFMotor.h>

AF_DCMotor leftMotor(2, MOTOR12_64KHZ);
AF_DCMotor rightMotor(1, MOTOR12_64KHZ); 

void goForward() {
  leftMotor.run(FORWARD);
  rightMotor.run(FORWARD);
}

void turnLeft() {
  leftMotor.run(RELEASE);
  rightMotor.run(FORWARD);
}

void turnRight() {
  leftMotor.run(FORWARD);
  rightMotor.run(RELEASE);
}

void goBackward() {
  leftMotor.run(BACKWARD);
  rightMotor.run(BACKWARD);
}

void stop() {
  leftMotor.run(RELEASE);
  rightMotor.run(RELEASE);
}


void setup()
{
  Serial.begin(9600);
  
  leftMotor.setSpeed(150);
  rightMotor.setSpeed(150);

  // stop();
}

void loop()
{
  goForward();
  delay(1000);

  turnRight();
  delay(1000);

  stop();
  delay(1000);
}