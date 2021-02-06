const int ledPin = LED_BUILTIN;
const int totalStates = 3;

int ledState[totalStates];
int ledDuration[totalStates] = { 200, 400, 500 };

void setup() {
  pinMode(LED_BUILTIN, OUTPUT);

<<<<<<< HEAD
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
=======
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
>>>>>>> afedddd2524ccb696e407ff9ca01b1cac463765d
}

void loop() {
  for (int i = 0; i < totalStates; i++) {
    digitalWrite(ledPin, ledState[i]);
    delay(ledDuration[i]);
  }
}
