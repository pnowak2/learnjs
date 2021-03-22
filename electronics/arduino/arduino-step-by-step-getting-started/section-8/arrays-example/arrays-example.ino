int my_integers[6] = { 1, 2, 3, 4, 5 };

void setup() {
  Serial.begin(9600);
  
  while(!Serial) {
    ;
  }

  Serial.println("Your array numbers");

  for(int i = 0; i < 5; i++) {
    Serial.print("Index ");
    Serial.print(i);
    Serial.print(" contains value");
    Serial.println(my_integers[i]);
  }

  for(int i = 0; i < 4; i++) {
    Serial.print(my_integers[i]);
    Serial.print(" + ");
    Serial.print(my_integers[i+1]);
    Serial.print(" = ");

    int sum = my_integers[i] + my_integers[i+1];
    my_integers[i] = sum;
    
    Serial.println(my_integers[i]);
  } 
}

void loop() {

}
