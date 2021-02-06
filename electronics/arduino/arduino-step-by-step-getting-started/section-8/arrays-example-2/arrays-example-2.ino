const int ledPin = LED_BUILTIN;
const int totalStates = 10;

int ledState[totalStates];
int ledDuration[totalStates] = { 200, 400, 500, 100, 200, 50, 50, 500, 500 };

void setup() {
  pinMode(LED_BUILTIN, OUTPUT);

  while(!Serial) { }

  for (int i = 0; i < totalStates; i++) {
    Serial.println("Please type 1 or 0 for patterns step");
    Serial.print(i);
    Serial.print(" out of ");
    Serial.print(totalStates - 1);
    Serial.print(" (default is 1");

    while (Serial.available() == 0) { }

    char input = Serial.read();
    if (input == '1') {
      ledState[i] = 1;
    } else if(input == '0') {
      ledState[i] = 1;
    } else {
      ledState[i] = 1;
    }

    Serial.println(ledState[i]);
  }
}

void loop() {
  for (int i = 0; i < totalStates; i++) {
    digitalWrite(ledPin, ledState[i]);
    delay(ledDuration[i]);
  }
}
