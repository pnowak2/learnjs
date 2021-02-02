int buttonState = 0;

void setup() {
  pinMode(2, INPUT);
  pinMode(A5, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  buttonState = digitalRead(2);

  if(buttonState == HIGH) {
    Serial.println("HIGH");
    digitalWrite(A5, HIGH);
  } else {
    Serial.println("LOW");
    digitalWrite(A5, LOW);
  }
}
