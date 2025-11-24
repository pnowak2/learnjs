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

  IrReceiver.begin(IR_PIN, ENABLE_LED_FEEDBACK);
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
   * KOD PILOTA DO LAMPKI BIUROWEJ
   *
   * ON / OFF
   * Protocol=NEC Address=0x0, Command=0x1, Raw-Data=0xFE01FF00, 32 bits, LSB first, Gap=3276750us, Duration=68300us
   * Send with: IrSender.sendNEC(0x0, 0x1, <numberOfRepeats>);
   * 
   * LIGHTER 
   * Protocol=NEC Address=0x0, Command=0x9, Raw-Data=0xF609FF00, 32 bits, LSB first, Gap=3276750us, Duration=68300us
   * Send with: IrSender.sendNEC(0x0, 0x9, <numberOfRepeats>);
   * 
   * DIMMER 
   * Protocol=NEC Address=0x0, Command=0x11, Raw-Data=0xEE11FF00, 32 bits, LSB first, Gap=3276750us, Duration=68250us
   * Send with: IrSender.sendNEC(0x0, 0x11, <numberOfRepeats>);
   */

  /*
   * KOD WENTYLATORA BRANDSON
   *
   * ON / OFF
   * Protocol=UNKNOWN Hash=0xDA0AE878 24 bits (incl. gap and start) received
   * 
   * DISPLAY
   * Protocol=UNKNOWN Hash=0xF40BF22B 24 bits (incl. gap and start) received
   */

  /*
   * KOD DO TEALIGHTS 
   *
   * ON 
   * Protocol=NEC Address=0x93CB, Command=0x50, Raw-Data=0xAF5093CB, 32 bits, LSB first, Gap=1877700us, Duration=68850us
   * end with: IrSender.sendNEC(0x93CB, 0x50, <numberOfRepeats>);
   * 
   * OFF 
   * Protocol=NEC Address=0x93CB, Command=0x5F, Raw-Data=0xA05F93CB, 32 bits, LSB first, Gap=594700us, Duration=68850us
   * Send with: IrSender.sendNEC(0x93CB, 0x5F, <numberOfRepeats>);
   * 
   * FLICKER
   * Protocol=NEC Address=0x93CB, Command=0x3B, Raw-Data=0xC43B93CB, 32 bits, LSB first, Gap=763350us, Duration=68800us
   * end with: IrSender.sendNEC(0x93CB, 0x3B, <numberOfRepeats>);
   * 
   * TIMER 4h
   * Protocol=NEC Address=0x93CB, Command=0x2F, Raw-Data=0xD02F93CB, 32 bits, LSB first, Gap=3276750us, Duration=68800us
   * Send with: IrSender.sendNEC(0x93CB, 0x2F, <numberOfRepeats>);
   * 
   * TIMER 6h
   * Protocol=NEC Address=0x93CB, Command=0x2A, Raw-Data=0xD52A93CB, 32 bits, LSB first, Gap=1362250us, Duration=68800us
   * Send with: IrSender.sendNEC(0x93CB, 0x2A, <numberOfRepeats>);
   */
}

void sendOnOff()
{
  IrSender.sendNEC(0x0, 0x1, 0);
  delay(2000);
}

void loop()
{
  decode();
  // sendOnOff();
}