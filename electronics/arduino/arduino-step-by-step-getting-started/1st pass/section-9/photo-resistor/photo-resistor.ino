int resistorVoltage {0};

void setup() {
  Serial.begin(9600);
  pinMode(A0, INPUT);
  pinMode(2, OUTPUT);
}

void loop() {
  resistorVoltage = map(analogRead(A0), 0, 900, 0, 10);
  if(resistorVoltage > 6) {
    digitalWrite(2, HIGH);
  } else {
    digitalWrite(2, LOW);
  }
  
  Serial.println(resistorVoltage);
}
