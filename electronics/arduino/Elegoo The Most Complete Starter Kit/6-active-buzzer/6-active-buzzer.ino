int BUZZER = 12;

void setup() {
  pinMode(BUZZER, OUTPUT);
}

void loop() {
  unsigned char i;

  while(true) {
    for(i=0; i < 90; i++) {
      digitalWrite(BUZZER, HIGH);
      delay(4);
      digitalWrite(BUZZER, LOW);
      delay(4);
    }

    for(i=0; i < 180; i++) {
      digitalWrite(BUZZER, HIGH);
      delay(2);
      digitalWrite(BUZZER, LOW);
      delay(2);
    }
  }
}
