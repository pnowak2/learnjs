#include <Arduino.h>

int my_integers[] {1,2,3,4,5};

void setup() {
  Serial.begin(9600);

  while(!Serial) {}

  Serial.println("Array numbers");

  for(int index = 0; index < 5; index++) {
    Serial.print("index: ");
    Serial.print(index);
    Serial.print(" with value: ");
    Serial.print(my_integers[index]);
    Serial.println("");
  }

  Serial.println();
  for(int i = 0; i < 4; i++) {
    Serial.println(my_integers[i] + my_integers[i+1]);
  }

  Serial.println();
  for(int i = 0; i < 4; i++) {
    my_integers[i] = (my_integers[i] + my_integers[i+1]);
    Serial.print(my_integers[i]);
  }
}

void loop() {

} 


