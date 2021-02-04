const int ledPin = LED_BUILTIN;
const int totalStates = 10;

int ledState[totalStates];
int ledDuration[totalStates] = { 200, 400, 500, 100, 200, 50, 50, 500, 500 };

void setup() {
  pinMode(LED_BUILTIN, OUTPUT);
}

void loop() {
  for (int i = 0; i < totalStates; i++) {
    digitalWrite(ledPin, ledState[i]);
    delay(ledDuration[i]);
  }
}
