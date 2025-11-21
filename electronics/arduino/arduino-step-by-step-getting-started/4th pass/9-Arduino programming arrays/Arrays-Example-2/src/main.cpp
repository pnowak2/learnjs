#include <Arduino.h>

char myChar [] {'a', 'b', 'c', 'd', 'e'};

void setup()
{
  Serial.begin(9600);
  while(!Serial);
}

void loop()
{
  for(int i = 0; i < 5; i++) {
    Serial.print(myChar[i]);
    Serial.print(" (");
    Serial.print(myChar[i], DEC);
    Serial.print(")");
    Serial.println();

    delay(250);

    Serial.print(myChar[i + 1]);
    Serial.print(", ");
    Serial.print(myChar[i + 1], DEC);
    Serial.println();
  }
}