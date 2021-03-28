#include <dht_nonblocking.h>

#define DHT_SENSOR_TYPE DHT_TYPE_11

static const int DHT_SENSOR_PIN = 2;
DHT_nonblocking dht_sensor(DHT_SENSOR_PIN, DHT_SENSOR_TYPE);

void setup() {
  Serial.begin(9600);
}

static bool measure(float *temperature, float *humidity) {
  static unsigned long timestamp = millis();
  if(millis() - timestamp > 3000ul) {
    if(dht_sensor.measure(temperature, humidity) == true) {
      timestamp = millis();
      return true;
    }
  }

  return false;
}

void loop() {
  float temperature {0};
  float humidity {0};

  if(measure(&temperature, &humidity) == true) {
    Serial.print(temperature, 1);
    Serial.print(" deg C, H = ");
    Serial.print(humidity, 1);
    Serial.println("%");
  }
}
