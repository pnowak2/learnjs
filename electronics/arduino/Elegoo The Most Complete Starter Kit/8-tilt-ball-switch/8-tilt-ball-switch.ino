const int ledPin = LED_BUILTIN;

void setup() {
  pinMode(ledPin, OUTPUT);
  pinMode(2, INPUT);
  digitalWrite(2, HIGH);
}

void loop() {
  int digitalVal = digitalRead(2);
  if(digitalVal == HIGH) {
    digitalWrite(ledPin, LOW);
  } else {
    digitalWrite(ledPin, HIGH);
  }

}
