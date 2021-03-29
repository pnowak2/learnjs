#include "pitches.h"

int melody[] { NOTE_C5, NOTE_D5, NOTE_E5, NOTE_G5, NOTE_A5, NOTE_B5, NOTE_C6 };
int duration = 500;

void setup() {
  // put your setup code here, to run once:

}

void loop() {
  for(int thisNote = 0; thisNote < 8; thisNote++) {
    tone(12, melody[thisNote], duration);
    delay(1000);
  }

  delay(2000);
}
