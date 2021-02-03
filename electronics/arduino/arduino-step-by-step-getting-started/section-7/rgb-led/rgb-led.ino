const int RED_LED = 3;
const int GREEN_LED = 5;
const int BLUE_LED = 6;

int redValue = 0;
int greenValue = 0;
int blueValue = 0;

bool goingUp = true;

void setup() {
  redValue = 0;
  pinMode(RED_LED, OUTPUT);
  pinMode(GREEN_LED, OUTPUT);
  pinMode(BLUE_LED, OUTPUT);

}

void loop() {
  if(redValue >= 40) {
    redValue -= 1;
  }
  
  if(redValue == 40) {
    redValue += 1;
  }

  analogWrite(RED_LED, redValue);
  delay(50);


//  analogWrite(GREEN_LED, 20);
//  analogWrite(BLUE_LED, 20);
}
