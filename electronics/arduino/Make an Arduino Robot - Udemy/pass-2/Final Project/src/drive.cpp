#include "drive.h"

Drive::Drive(uint8_t leftPin, uint8_t rightPin) : leftPin(leftPin), rightPin(rightPin) {}

void Drive::begin()
{
  leftServo.attach(leftPin);
  rightServo.attach(rightPin);
}

int Drive::speedToPulse(int speed) {
  speed = constrain(speed, -100, 100);
  int center = 1500;
  int range = 500;

  return center + (speed * range) / 100;
}

void Drive::setSpeed(int leftSpeed, int rightSpeed) {
  leftServo.writeMicroseconds(speedToPulse(leftSpeed));
  rightServo.writeMicroseconds(speedToPulse(-rightSpeed));
}

void Drive::stop()
{
  setSpeed(0, 0);
}