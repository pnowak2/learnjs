int potValue = 0;
int potMappedValue = 0;

void setup() {
  pinMode(A0, INPUT);
  pinMode(3, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  // put your main code here, to run repeatedly:
  potValue = analogRead(A0);
  potMappedValue = map(potValue, 0, 1023, 0, 255);
  analogWrite(3, potMappedValue);

  Serial.println(potMappedValue);
}
