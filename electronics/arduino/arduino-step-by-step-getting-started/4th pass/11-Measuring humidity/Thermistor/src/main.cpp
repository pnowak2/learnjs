#include "thermistor.h"
#include "HardwareSerial.h"


// Analog pin used to read the NTC
#define NTC_PIN               A2

// Thermistor object
THERMISTOR thermistor(NTC_PIN,        // Analog pin
                      10300,          // Nominal resistance at 25 ºC
                      3950,           // thermistor's beta coefficient
                      4660);         // Value of the series resistor

// Global temperature reading
uint16_t temp;

/**
 * setup
 *
 * Arduino setup function
 */
void setup()
{
  Serial.begin(9600);
}

/**
 * loop
 *
 * Arduino main loop
 */
void loop()
{
  temp = thermistor.read();   // Read temperature

  Serial.print("Temp in 1/10 ºC : ");
  Serial.println(temp);

  delay(5000);
}

