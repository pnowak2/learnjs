#include "I2CScanner.h"
#include <Wire.h>

I2CScanner scanner;

//if you use ESP8266-01 with not default SDA and SCL pins, define these 2 lines, else delete them	
#define SDA_PIN 4	
#define SCL_PIN 5

void setup() 
{	
	//uncomment the next line if you use custom sda and scl pins for example with ESP8266-01 (sda = 4, scl = 5)
	//Wire.begin(SDA_PIN, SCL_PIN);
	
	Serial.begin(9600);
	while (!Serial) {};

	scanner.Init();
}

void loop() 
{
	scanner.Scan();
	delay(5000);
}
