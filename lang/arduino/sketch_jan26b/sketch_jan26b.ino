const int firstNumber = 2;
    
void setup() {
  int secondNumber;

  secondNumber = 6;
  
  word result = calculate(secondNumber);
  
  Serial.begin(9600);
  Serial.println("Preparing..");
  Serial.println(result);
}

void loop() {
  // put your main code here, to run repeatedly:

}

int calculate(int y) {
//  firstNumber = 1;
  int result = 2*firstNumber*y;
  
  return result;
}
