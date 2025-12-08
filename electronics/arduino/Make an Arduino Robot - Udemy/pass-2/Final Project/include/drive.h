#pragma once
#include <Arduino.h>
#include <Servo.h>

class Drive
{
public:
  Drive(uint8_t leftPin, uint8_t rightPin);

  void begin();
  void setSpeed(int leftSpeed, int rightSpeed);
  void stop();

private:
  Servo leftServo;
  Servo rightServo;

  uint8_t leftPin;
  uint8_t rightPin;

  int speedToPulse(int speed);
};
