#include "Arduino.h"

int leftSensorPin = A0;
int leftSensorValue = 0;
int rightSensorPin = A2;
int rightSensorValue = 0;
int leftLedIndicator = 2;
int rightLedIndicator = 3;

int tresholdPotPin = A4;

int tresholdValue = 700;
int sensorDifference = 0;

int closeness = 70;

bool shouldGoForward() {
  if(leftSensorValue >= tresholdValue / 2 &&
     leftSensorValue <= tresholdValue &&
     rightSensorValue >= tresholdValue / 2 &&
     rightSensorValue <= tresholdValue &&
     sensorDifference <= closeness) { 
      return true;
     } else {
      return false;
     }
}

bool shouldStop() {
  if(leftSensorValue >= tresholdValue &&
     rightSensorValue >= tresholdValue &&
     sensorDifference <= closeness) { 
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
  digitalWrite(leftLedIndicator, HIGH);
  digitalWrite(rightLedIndicator, HIGH);
}

void stop() {
  digitalWrite(leftLedIndicator, LOW);
  digitalWrite(rightLedIndicator, LOW);
}

void turnLeft() {
  digitalWrite(leftLedIndicator, HIGH);
  digitalWrite(rightLedIndicator, LOW);
}

void turnRight() {
  digitalWrite(leftLedIndicator, LOW);
  digitalWrite(rightLedIndicator, HIGH);
}

void lost() {
  for(int i = 0; i < 5; i++) {
    digitalWrite(leftLedIndicator, LOW);
    digitalWrite(rightLedIndicator, LOW);
    delay(50);
    digitalWrite(leftLedIndicator, HIGH);
    digitalWrite(rightLedIndicator, HIGH);
    delay(50);
  }
}

void setup()
{
  Serial.begin(9600);

  pinMode(leftLedIndicator, OUTPUT);
  pinMode(rightLedIndicator, OUTPUT);
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
