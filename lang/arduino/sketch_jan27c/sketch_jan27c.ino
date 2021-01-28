

void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
}

void loop() {
  // put your main code here, to run repeatedly:
  for(int counter = 0; counter < 10; counter++) {
    Serial.println("Less than 10");
    delay(500);
  }
}
