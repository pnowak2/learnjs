#include "Arduino.h"

int leftSensorPin = A0;
int rightSensorPin = A2;
int tresholdPotPin = A4;
int leftLedIndicatorPin = 2;
int rightLedIndicatorPin = 3;

const int SENSOR_CLOSENESS = 70;

int rightSensorValue = 0;
int leftSensorValue = 0;
int sensorDifference = 0;
int tresholdValue = 700;

bool shouldGoForward() {
  if(leftSensorValue >= tresholdValue / 2 &&
     leftSensorValue <= tresholdValue &&
     rightSensorValue >= tresholdValue / 2 &&
     rightSensorValue <= tresholdValue &&
     sensorDifference <= SENSOR_CLOSENESS) { 
      return true;
     } else {
      return false;
     }
}

bool shouldStop() {
  if(leftSensorValue >= tresholdValue &&
     rightSensorValue >= tresholdValue &&
     sensorDifference <= SENSOR_CLOSENESS) { 
      return true;
     } else {
      return false;
     }
}

bool shouldTurnLeft() {
  if(leftSensorValue >= rightSensorValue &&
     leftSensorValue >= tresholdValue / 2 &&
     rightSensorValue >= tresholdValue / 2) { 
      return true;
     } else {
      return false;
     }
}

bool shouldTurnRight() {
  if(rightSensorValue >= leftSensorValue &&
     leftSensorValue >= tresholdValue / 2 &&
     rightSensorValue >= tresholdValue / 2) { 
      return true;
     } else {
      return false;
     }
}

bool isLost() {
  if(leftSensorValue < tresholdValue / 2 &&
     rightSensorValue < tresholdValue / 2) { 
      return true;
     } else {
      return false;
     }
}

void goForward() {
  digitalWrite(leftLedIndicatorPin, HIGH);
  digitalWrite(rightLedIndicatorPin, HIGH);
}

void stop() {
  digitalWrite(leftLedIndicatorPin, LOW);
  digitalWrite(rightLedIndicatorPin, LOW);
}

void turnLeft() {
  digitalWrite(leftLedIndicatorPin, HIGH);
  digitalWrite(rightLedIndicatorPin, LOW);
}

void turnRight() {
  digitalWrite(leftLedIndicatorPin, LOW);
  digitalWrite(rightLedIndicatorPin, HIGH);
}

void lost() {
  for(int i = 0; i < 5; i++) {
    digitalWrite(leftLedIndicatorPin, LOW);
    digitalWrite(rightLedIndicatorPin, LOW);
    delay(50);
    digitalWrite(leftLedIndicatorPin, HIGH);
    digitalWrite(rightLedIndicatorPin, HIGH);
    delay(50);
  }
}

void setup()
{
  Serial.begin(9600);

  pinMode(leftLedIndicatorPin, OUTPUT);
  pinMode(rightLedIndicatorPin, OUTPUT);
}


void loop()
{
  leftSensorValue = analogRead(leftSensorPin);
  rightSensorValue = analogRead(rightSensorPin);
  tresholdValue = analogRead(tresholdPotPin);
  sensorDifference = abs(leftSensorValue - rightSensorValue);

  if (shouldGoForward()) {
    goForward();
  } else if (shouldStop()) {
    stop();
  } else if (shouldTurnLeft()) {
    turnLeft();
  } else if (shouldTurnRight()) {
    turnRight();
  } else if (isLost()) {
    lost();
  } else {
    lost();
  }

  Serial.print(leftSensorValue);
  Serial.print(", ");
  Serial.print(rightSensorValue);
  Serial.print(", ");
  Serial.print(tresholdValue);
  Serial.println();

  delay(10);
}
