#include <Arduino.h>
#include <IRremote.h>

const int IR_PIN = 2;
const int TX_PIN = 3;
const int EN_PIN = 4;

void setup()
{
  Serial.begin(9600);

  pinMode(EN_PIN, OUTPUT);
  digitalWrite(EN_PIN, LOW);

  // IrReceiver.begin(IR_PIN, ENABLE_LED_FEEDBACK);
  IrSender.begin(TX_PIN, ENABLE_LED_FEEDBACK);
}

void decode()
{
  if (IrReceiver.decode())
  {
    IrReceiver.printIRResultShort(&Serial);
    IrReceiver.printIRSendUsage(&Serial);
    Serial.println();
    IrReceiver.resume();
  }
  /*
   * kod on/off pilota do lampki biurowej
   * Protocol=NEC Address=0x0, Command=0x1, Raw-Data=0xFE01FF00, 32 bits, LSB first, Gap=3276750us, Duration=68300us
   * Send with: IrSender.sendNEC(0x0, 0x1, <numberOfRepeats>);
   */
}

void sendOnOff()
{
  IrSender.sendNEC(0x0, 0x1, 0);
  delay(2000);
}

void loop()
{
  // decode();
  sendOnOff();
}