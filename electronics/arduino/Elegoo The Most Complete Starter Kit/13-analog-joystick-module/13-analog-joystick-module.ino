const int HORIZONTAL_PIN = A0;
const int VERTICAL_PIN = A1;
const int SWITCH_PIN = 7;

void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
  pinMode(HORIZONTAL_PIN, INPUT);
  pinMode(VERTICAL_PIN, INPUT);
  pinMode(SWITCH_PIN, INPUT_PULLUP);
  digitalWrite(SWITCH_PIN, HIGH);
}

void loop() {
  int switchState = digitalRead(SWITCH_PIN);
  long x = analogRead(HORIZONTAL_PIN);
  long y = analogRead(VERTICAL_PIN);
  
  Serial.print("Switch: ");
  Serial.println(switchState);

  Serial.print("x: ");
  Serial.println(x);

  Serial.print("y: ");
  Serial.println(y);

  delay(500);
}
