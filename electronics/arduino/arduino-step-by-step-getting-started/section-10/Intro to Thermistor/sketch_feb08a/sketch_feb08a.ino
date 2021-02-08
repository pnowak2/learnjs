const int SERIESRESISTOR = 9910; // Ohm

void setup() {
  Serial.begin(9600);
  pinMode(A0, INPUT);
}

void loop() {
  float rawValue = analogRead(A0);
  float thermistorVoltage = (rawValue * 5)/1024;
  float thermistorResistance = (thermistorVoltage * SERIESRESISTOR) / (5 - thermistorVoltage);
  float temperature = -10 * thermistorVoltage + 47; // linear function

  Serial.print("Raw value: ");
  Serial.println(rawValue);

  Serial.print("thermistorVoltage: ");
  Serial.println(thermistorVoltage);

  Serial.print("thermistorResistance: ");
  Serial.println(thermistorResistance);

  Serial.print("temperature: ");
  Serial.println(temperature);

  delay(1000);
}
