#define BLUE 6
#define GREEN 5
#define RED 3

void setup() {
  pinMode(RED, OUTPUT);
  pinMode(GREEN, OUTPUT);
  pinMode(BLUE, OUTPUT);

  digitalWrite(RED, HIGH);
  digitalWrite(GREEN, LOW);
  digitalWrite(BLUE, LOW);
}

int redValue;
int greenValue;
int blueValue;

void loop() {
  #define delayTime 100

  redValue = 24;
  greenValue = 0;
  blueValue = 0;

  for(int i = 0; i < 24; i++) {
    redValue -=1;
    greenValue +=1;

    analogWrite(RED, redValue);
    analogWrite(GREEN, greenValue);
    delay(delayTime);
  }

  redValue = 0;
  greenValue = 24;
  blueValue = 0;

  for(int i = 0; i < 24; i++) {
    greenValue -=1;
    blueValue +=1;

    analogWrite(GREEN, greenValue);
    analogWrite(BLUE, blueValue);
    delay(delayTime);
  }

  redValue = 0;
  greenValue = 0;
  blueValue = 24;

  for(int i = 0; i < 24; i++) {
    blueValue -=1;
    redValue +=1;

    analogWrite(BLUE, blueValue);
    analogWrite(RED, redValue);
    delay(delayTime);
  }
}
