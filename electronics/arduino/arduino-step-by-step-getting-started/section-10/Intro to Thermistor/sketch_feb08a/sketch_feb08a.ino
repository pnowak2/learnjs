const int SERIESRESISTOR = 9910; // Ohm

void setup() {
  Serial.begin(9600);
  pinMode(A0, INPUT);
}

void loop() {
  float rawValue = analogRead(A0);

  Serial.print("Raw value: ");
  Serial.println(rawValue);

  delay(1000);
}
