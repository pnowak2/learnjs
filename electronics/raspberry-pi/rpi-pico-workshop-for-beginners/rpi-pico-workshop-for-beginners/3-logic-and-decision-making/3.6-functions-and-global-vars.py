from machine import Pin
from time import sleep

led = Pin(16, Pin.OUT)
switch = Pin(15, Pin.IN)

led.toggle()

def sos():
  for _ in range(0, 10):
    led.on()
    sleep(0.1)
    led.off()
    sleep(0.1)

while True:
  if switch.value():
    sos()
  else:
    led.off()
  
