from machine import Pin
import time

led = Pin("LED", Pin.OUT) # Pin 16 connected to LED

while True:
  led.on()
  time.sleep(1)
  led.off()
  time.sleep(1)