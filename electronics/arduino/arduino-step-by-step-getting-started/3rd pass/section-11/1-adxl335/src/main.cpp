#include <Arduino.h>

const int X_axis = A3;
const int Y_axis = A2;
const int Z_axis = A1;

int x, y, z;

void setup() {
  Serial.begin(9600);
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

  delay(100);
}
