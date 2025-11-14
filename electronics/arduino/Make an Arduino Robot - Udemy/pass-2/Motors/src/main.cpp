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
Servo panMotor;
Servo panMotor2;

void setup() {
  Serial.begin(9600);
  panMotor.attach(6); // pin 6
  panMotor2.attach(5); // pin 6

  panMotor.write(90); // set to center position
  panMotor2.write(90); // set to center position
  delay(2000);
}

void loop() {
  panMotor.write(132); // full left
  delay(1000);

  panMotor2.write(132); // full left
  delay(1000);
  panMotor2.write(90); // full left
  delay(1000);

  panMotor.write(90); // full right
  delay(2000);
}