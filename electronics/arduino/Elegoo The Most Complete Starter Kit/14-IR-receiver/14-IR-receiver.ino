#include "IRremote.h"

int receiver = 11;

IRrecv irrecv(receiver);
decode_results results;

void translate() {
  switch (results.value) {
    case 0xFFA25D: Serial.println("Power"); break;
    case 0xFF30CF: Serial.println("1"); break;
    case 0xFF18E7: Serial.println("2"); break;
    case 0xFF7A85: Serial.println("3"); break;
    case 0xFF906F: Serial.println("Up"); break;
    case 0xFFE01F: Serial.println("Down"); break;
    default:
      Serial.println("other button");
  }
}

void setup() {
  Serial.begin(9600);
  Serial.println("IR Receiver Button Decode");
  irrecv.enableIRIn();
}

void loop() {
  if(irrecv.decode(&results)) {
    translate();
    irrecv.resume();
  }
}
