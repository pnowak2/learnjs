const byte SensorPin = A0;
float supplyVoltage = 3.3;

void setup() {
  pinMode(SensorPin, INPUT);
  Serial.begin(9600);
  analogReference(EXTERNAL);
}

void loop() {
  int reading = analogRead(SensorPin);
  float voltage = (reading * supplyVoltage) / 1024;
  float temperature = voltage * 100;

  Serial.print("Voltage: ");
  Serial.println(voltage);

  Serial.print("Temperature: ");
  Serial.println(temperature);

  delay(500);
}
