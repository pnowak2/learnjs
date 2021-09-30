#define RED_PIN 3
#define GREEN_PIN 5
#define BLUE_PIN 6

bool goingUp = true;

void setup() {
  pinMode(RED_PIN, OUTPUT);
  pinMode(GREEN_PIN, OUTPUT);
  pinMode(BLUE_PIN, OUTPUT);
}

void loop() {
  analogWrite(RED_PIN, 1);
  analogWrite(GREEN_PIN, 0);
  analogWrite(BLUE_PIN, 0);

  delay(1000);

  analogWrite(RED_PIN, 0);
  analogWrite(GREEN_PIN, 1);
  analogWrite(BLUE_PIN, 0);  

  delay(1000);

  analogWrite(RED_PIN, 0);
  analogWrite(GREEN_PIN, 0);
  analogWrite(BLUE_PIN, 1);

   delay(1000);
}
