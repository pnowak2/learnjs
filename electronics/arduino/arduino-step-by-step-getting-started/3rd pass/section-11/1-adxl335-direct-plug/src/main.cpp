#include <Arduino.h>

const int X_axis = A4;
const int Y_axis = A3;
const int Z_axis = A2;

const int Ground_pin = A1;
const int Power_pin = A5;

int x, y, z;

void setup() {
  Serial.begin(9600);

  pinMode(Ground_pin, OUTPUT);
  pinMode(Power_pin, OUTPUT);

  digitalWrite(Ground_pin, LOW);
  digitalWrite(Power_pin, HIGH);
}

void loop() {
  x = analogRead(X_axis);
  y = analogRead(Y_axis);
  z = analogRead(Z_axis);

  Serial.print(x);
  Serial.print(",");
  Serial.print(y);
  Serial.print(",");
  Serial.print(z);
  Serial.println();

  if((x > 325 && x < 350) && (y > 330 && y < 355) && (z > 390 && z < 410)) {
    Serial.println("Horizontal");
  } else if((x > 325 && x < 345) && (y > 320 && y < 352) && (z > 270 && z < 280)) {
    Serial.println("Flipped");
  } else {
    Serial.println("No idea where I am");
  }

  delay(100);
}
