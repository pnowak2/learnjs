#include <Arduino.h>

int myIntegers[]{1, 2, 3, 4, 5};

void setup()
{
  Serial.begin(9600);
  while (!Serial)
    ;

  Serial.println("Your array numbers");
}

void loop()
{
  for (int i = 0; i < 5; i++)
  {
    Serial.print("Index ");
    Serial.print(1);
    Serial.print(" contains value ");
    Serial.println(myIntegers[i]);

    delay(200);
  }

  Serial.println();

  for(int i = 0; i < 4; i++) {
    Serial.print(myIntegers[i]);
    Serial.print(" + ");
    Serial.print(myIntegers[i + 1]);
    Serial.print(" = ");
    Serial.println(myIntegers[i] + myIntegers[i + 1]);
    delay(200);
  }

  Serial.println();

  for(int i = 0; i < 4; i++) {
    Serial.print(myIntegers[i]);
    Serial.print(" + ");
    Serial.print(myIntegers[i + 1]);
    Serial.print(" = ");
    Serial.println(myIntegers[i] + myIntegers[i + 1]);

    int sum = myIntegers[i] + myIntegers[i + 1];

    myIntegers[i] = sum;
    Serial.print(myIntegers[i]);

    delay(200);
  }
}