#include <Arduino.h>

int ledPin = 3;               // choose the pin for the LED
int inputPin = 4;             // choose the input pin (for PIR sensor)
int pirState = true;          // we start, assuming no motion detected
int val = 0;                  // variable for reading the pin status
int minSecAfterPIRLow = 5000; // If the sensor reports low
                              // remain HIGH for this many milliseconds
long unsigned int timeTurnedLow;
boolean takeLowTime; // This variable is used to record the event where the sensor turns off

// the time we give the sensor to calibrate (10-60 secs according to the datasheet)
int calibrationTime = 30;

void setup()
{
  pinMode(ledPin, OUTPUT);  // declare LED as output
  pinMode(inputPin, INPUT); // declare sensor as input

  takeLowTime = LOW;

  Serial.begin(9600);

  Serial.println("Waiting for the sensor to warm up.");
  delay(calibrationTime * 1000); // Convert the time from seconds to milliseconds.
  Serial.println("SENSOR ACTIVE");
}

void loop()
{
  val = digitalRead(inputPin); // read input value

  if (val == HIGH)
  {                             // check if the input is HIGH
    digitalWrite(ledPin, HIGH); // turn LED ON
    if (pirState == LOW)
    {
      // we have just turned on
      Serial.println("Motion detected!");
      // We only want to print on the output change, not state
      pirState = HIGH;
    }
  }
  else
  {

    if (pirState == HIGH)
    {
      // we have just turned off
      Serial.println("Motion ended!");
      // We only want to print on the output change, not state
      pirState = LOW;
      timeTurnedLow = millis(); // take the millis at the moment the sensor went LOW
    }
  }

  // This block checks to see if enough time has passed after the PRI went LOW.
  // If yes, and assuming that the PIR sensor did not go HIGH again, turn off the LED
  if (!pirState && (millis() - timeTurnedLow) > minSecAfterPIRLow)
  {
    Serial.println("Extended time HIGH ended!");
    digitalWrite(ledPin, LOW); // turn LED OFF
  }

  delay(1000);
}