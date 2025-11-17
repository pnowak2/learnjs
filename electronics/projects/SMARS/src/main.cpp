#include <Arduino.h>
#include <AFMotor.h>
#include <HCSR04.h>

#define TRIG_PIN A5
#define ECHO_PIN A4
#define ECHO_INT 0

UltraSonicDistanceSensor distanceSensor(TRIG_PIN, ECHO_PIN);

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
}

void loop()
{
    int dystans = distanceSensor.measureDistanceCm();

    goForward();

    if(dystans <= 5) {
      stop();
      delay(1000);
      spinRight();
      delay(100);
      spinLeft();
      delay(100);
      spinRight();
      delay(100);
      spinLeft();
      delay(100);

      goBackward();
      delay(500);
      spinRight();
      delay(1000);
    }
  // goForward();
  // delay(3000);

  // spinRight();
  // delay(1000);

  // stop();
  // delay(1000);
}
