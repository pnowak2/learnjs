from machine import Pin
import time

button = Pin(1, Pin.IN, Pin.PULL_DOWN)
led = Pin(16, Pin.OUT)

timer = 0

while True:
  isOn = button.value()

  if isOn == 1:
    timer += 1
    led.on()
  else:
    led.off()
  
  print(isOn, timer)
  time.sleep(0.1)
