int uvRaw {0};

void setup() {
  Serial.begin(9600);
  pinMode(A0, INPUT);
}

void loop() {
  uvRaw = analogRead(A0);
  Serial.println(uvRaw);
  delay(100);
}
