#include <Arduino.h>
#include <AFMotor.h>

AF_DCMotor leftMotor(2, MOTOR12_64KHZ);
AF_DCMotor rightMotor(1, MOTOR12_64KHZ);

void goForward()
{
  leftMotor.run(FORWARD);
  rightMotor.run(FORWARD);
}

void turnLeft()
{
  leftMotor.run(RELEASE);
  rightMotor.run(FORWARD);
}

void spinLeft()
{
  leftMotor.run(BACKWARD);
  rightMotor.run(FORWARD);
}

void turnRight()
{
  leftMotor.run(FORWARD);
  rightMotor.run(RELEASE);
}

void spinRight()
{
  leftMotor.run(FORWARD);
  rightMotor.run(BACKWARD);
}

void goBackward()
{
  leftMotor.run(BACKWARD);
  rightMotor.run(BACKWARD);
}

void stop()
{
  leftMotor.run(RELEASE);
  rightMotor.run(RELEASE);
}

void setup()
{
  Serial.begin(9600);

  leftMotor.setSpeed(250);
  rightMotor.setSpeed(250);

  // stop();
}

void loop()
{
  goForward();
  delay(3000);

  spinRight();
  delay(1000);

  stop();
  delay(1000);
}