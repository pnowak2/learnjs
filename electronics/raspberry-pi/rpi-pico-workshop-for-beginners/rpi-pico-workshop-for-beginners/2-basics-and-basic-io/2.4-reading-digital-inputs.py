from machine import Pin
import time

button = Pin(15, Pin.IN, Pin.PULL_DOWN)
led = Pin(16, Pin.OUT)

while True:
  if(button.value() == 1):
    led.value(0)
  else:
    led.value(1)

  time.sleep(0.1)
