char my_char[6] {'a', 'b', 'c'};

void setup() {
  Serial.begin(9600);

  while (!Serial) {
    ;
  }

  Serial.println("Your array char:");

  for (int i = 0; i < 3; i++) {
    Serial.println(my_char[i]);
    Serial.println(my_char[i], DEC);
  }
}

void loop() {
  // put your main code here, to run repeatedly:

}
