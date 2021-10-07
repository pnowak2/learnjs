#include <Arduino.h>

int rightSensorPin = A0;
int leftSensorPin = A2;
int rightLedPin = 3;
int leftLedPin = 2;
int thresholdPot = A4;

int leftSensorValue = 0;
int rightSensorValue = 0;
int sensorDifference = 0;

int closeness = 50;
int threshold;

void setup()
{
  pinMode(leftSensorPin, INPUT);
  pinMode(rightSensorPin, INPUT);
  pinMode(thresholdPot, INPUT);

  pinMode(leftLedPin, OUTPUT);
  pinMode(rightLedPin, OUTPUT);

  Serial.begin(9600);
}

void loop()
{
  threshold = analogRead(thresholdPot);

  Serial.print("Threshold: ");
  Serial.print(threshold);
  Serial.print("(");
  Serial.print(threshold / 2);

  Serial.print("), L=");
  leftSensorValue = analogRead(leftSensorPin);
  Serial.print(leftSensorValue);

  Serial.print("), R=");
  rightSensorValue = analogRead(rightSensorPin);
  Serial.print(rightSensorValue);

  Serial.print(", Diff=");

  sensorDifference = abs(leftSensorValue - rightSensorValue);

  Serial.print(sensorDifference);
  Serial.print(", Move: ");

  if (leftSensorValue <= threshold &&
      rightSensorValue <= threshold &&
      leftSensorValue >= threshold / 2 &&
      rightSensorValue >= threshold / 2 &&
      sensorDifference <= closeness)
  {
    Serial.print("Forward");
    digitalWrite(leftLedPin, HIGH);
    digitalWrite(rightLedPin, HIGH);
    delay(10);
  }
  else if (leftSensorValue >= threshold &&
           rightSensorValue >= threshold &&
           sensorDifference <= closeness)
  {
    Serial.print("STOP");
    digitalWrite(leftLedPin, LOW);
    digitalWrite(rightLedPin, LOW);
    delay(10);
  } else if (leftSensorValue < rightSensorValue &&
           leftSensorValue >= threshold/2)
  {
    Serial.print("RIGHT");
    digitalWrite(leftLedPin, HIGH);
    digitalWrite(rightLedPin, LOW);
    delay(10);
  } else if (leftSensorValue > rightSensorValue &&
           leftSensorValue >= threshold/2)
  {
    Serial.print("LEFT");
    digitalWrite(leftLedPin, LOW);
    digitalWrite(rightLedPin, HIGH);
    delay(10);
  } else if (leftSensorValue < threshold/2 &&
           rightSensorValue < threshold/2)
  {
    Serial.print("LOST");
    for (int i = 0; i < 10; i++) {
      digitalWrite(leftLedPin, LOW);
      digitalWrite(rightLedPin, LOW);
      delay(50);
      digitalWrite(leftLedPin, HIGH);
      digitalWrite(rightLedPin, HIGH);
      delay(50);
    }
  }

  Serial.println();
}