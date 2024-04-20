#include <Arduino.h>
#include <Adafruit_Sensor.h>
#include <DHT.h>
#include <DHT_U.h>

#define DHTPIN 2     // Digital pin connected to the DHT sensor 
#define DHTTYPE    DHT11     // DHT 11

DHT_Unified dht(DHTPIN, DHTTYPE);
uint32_t delayMS;

void setup() {
  Serial.begin(9600);
  Serial.println("DHTxx Unified Sensor Example");

  dht.begin();

  sensor_t sensor;

  dht.temperature().getSensor(&sensor);

  Serial.print("Sensor name: ");
  Serial.print(sensor.name);
  Serial.println();

  Serial.print("Max temp: ");
  Serial.print(sensor.max_value);
  Serial.println();

  Serial.print("Min temp:");
  Serial.print(sensor.min_value);
  Serial.println();

  Serial.print("Resolution: ");
  Serial.print(sensor.resolution);
  Serial.println();

  Serial.print("Type: ");
  Serial.print(sensor.type);
  Serial.println();

  Serial.print("Version: ");
  Serial.print(sensor.version);
  Serial.println();

  Serial.print("Sensor Id: ");
  Serial.print(sensor.sensor_id);
  Serial.println();

  Serial.print("Sensor min delay: ");
  Serial.print(sensor.min_delay);
  Serial.println();

  delayMS = sensor.min_delay / 1000;

  Serial.print("Actual delay: ");
  Serial.print(delayMS);
  Serial.println();

}

void loop() {
  delay(delayMS);

  sensors_event_t event;

  dht.temperature().getEvent(&event);

  if (isnan(event.temperature)) {
    Serial.println(F("Error reading temperature!"));
  } else {
    Serial.print("Temperature: ");
    Serial.println(event.temperature);
  }

  dht.humidity().getEvent(&event);

  if (isnan(event.relative_humidity)) {
    Serial.println(F("Error reading relative humidity!"));
  } else {
    Serial.print("Relative humidity: ");
    Serial.println(event.relative_humidity);
  }

} 
