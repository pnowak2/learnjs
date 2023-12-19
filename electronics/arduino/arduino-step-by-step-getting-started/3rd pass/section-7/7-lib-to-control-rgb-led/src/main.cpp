#include <Arduino.h>
#include <AlaLedRgb.h>

AlaLedRgb rgbLed;

#define RED_PIN 3
#define GREEN_PIN 5
#define BLUE_PIN 6

void setup()
{
  rgbLed.initPWM(RED_PIN, GREEN_PIN, BLUE_PIN); // initialize output pins
  rgbLed.setBrightness(0xff1144); // calibrate white
  rgbLed.setAnimation(ALA_GLOW, 3000, alaPalRgb); // set the animation
}

void loop()
{
  rgbLed.runAnimation();  // run the animation indefinitely
}
