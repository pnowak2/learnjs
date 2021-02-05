const int ledPin = LED_BUILTIN;
const int totalStates = 3;

int ledState[totalStates];
int ledDuration[totalStates] = { 200, 400, 500 };

void setup() {
  pinMode(LED_BUILTIN, OUTPUT);

  Serial.begin(9600);
  while(!Serial) { }

  for(int i = 0; i < totalStates; i++) {
    Serial.print("Number");
    Serial.println(i);
    Serial.println("Provide state 1 or 0: ");

    while(!Serial.available()) { }
    
    char userInput = Serial.read();
    switch(userInput) {
      case '0':
        ledState[i] = 0;
        break;
      case '1':
        ledState[i] = 1;
        break;
    }

    Serial.print("Confirmed state ");
    Serial.println(userInput);
  }

  Serial.println("All done");
  Serial.print(ledState[0], DEC);
  Serial.print(ledState[1], DEC);
  Serial.print(ledState[2], DEC);
}

void loop() {
  for (int i = 0; i < totalStates; i++) {
    digitalWrite(ledPin, ledState[i]);
    delay(ledDuration[i]);
  }
}
