#include <Arduino.h>

#define RESISTOR 9910 
#define THERMISTOR_PIN A0

void setup() {
    Serial.begin(9600);
}

void loop() {
    float reading {0};

    reading = analogRead(THERMISTOR_PIN);


    // from voltage divider equation (solving for R2 at output)
    reading = RESISTOR * (reading / (1023 - reading));

    // same as above, just rephrased in steps
    // reading = (1023 / reading) - 1;
    // reading = RESISTOR / reading;

    Serial.print("Analog reading ");
    Serial.println(reading);

    delay(1000);
} 
