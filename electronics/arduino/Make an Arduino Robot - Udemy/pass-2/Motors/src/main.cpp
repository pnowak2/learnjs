#include <Arduino.h>
#include <Servo.h>

/**
 * range for cotinous motor servo is 0-180
 * 90 is neutral, below is one direction, above another direction
 * speed regulated by all values in between
 */

 /**
  * range for non-continous servo motor is also 0-180
  * but this time min and max values denote angle how shaft should turn
  */

const int RForward = 120; // the speed of the servo, max. speed is 180
const int RBackward = 60;

const int LForward = 120;
const int LBackward = 60;

const int RNeutral = 90; // centered position
const int LNeutral = 90;

Servo leftMotor;
Servo rightMotor;
Servo panMotor;

void setup() {
  Serial.begin(9600);
  rightMotor.attach(11); // pin 11
  leftMotor.attach(10); // pin 10
  panMotor.attach(6); // pin 6

  panMotor.write(90); // set to center position
  leftMotor.write(LNeutral);
  rightMotor.write(RNeutral);
}

void loop() {
  panMotor.write(0); // full right
  leftMotor.write(LForward);
  rightMotor.write(RForward);

  delay(1000);

  panMotor.write(180); // full left
  leftMotor.write(LBackward);
  rightMotor.write(RBackward);

  delay(1000);

  panMotor.write(90); // center
  leftMotor.write(LForward);
  rightMotor.write(RBackward);

  delay(1000);
}