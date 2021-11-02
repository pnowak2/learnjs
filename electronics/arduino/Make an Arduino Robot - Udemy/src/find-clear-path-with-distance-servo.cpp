#include <Arduino.h>
#include <Ultrasonic.h>
#include <Servo.h>


#define TRIG_PIN 3
#define ECHO_PIN 2
#define PAN_SERVO_PIN 6

/*
 * Pass as a parameter the trigger and echo pin, respectively,
 * or only the signal pin (for sensors 3 pins), like:
 * Ultrasonic ultrasonic(13);
 */
Ultrasonic ultrasonic(TRIG_PIN, ECHO_PIN);
Servo panMotor;

const int collisionThresh = 15;
int leftDistance;
int rightDistance;

void compareDistance() {
    if(leftDistance > rightDistance) {
        Serial.println("Left turn!");
        delay(500);
    } else if(rightDistance > leftDistance) {
        Serial.println("Right turn!");
        delay(500);
    } else {
        Serial.println("Turn back!");
        delay(1000);
    }
}

void setup() {
  Serial.begin(9600);
  panMotor.attach(PAN_SERVO_PIN);
  panMotor.write(90);
}

void loop() {
  // Pass INC as a parameter to get the distance in inches
  int distance = ultrasonic.read();
  Serial.print(distance);
  Serial.print("cm");

  if(distance > collisionThresh) {
      Serial.println("Forward, path clear!");
      delay(250);
  } else {
      panMotor.write(0);
      delay(200);
      leftDistance = ultrasonic.read();
      delay(200);
      panMotor.write(180);
      delay(300);
      rightDistance = ultrasonic.read();
      delay(200);
      panMotor.write(90);
      delay(200);
      compareDistance();
  }
  
  delay(1000);
}
