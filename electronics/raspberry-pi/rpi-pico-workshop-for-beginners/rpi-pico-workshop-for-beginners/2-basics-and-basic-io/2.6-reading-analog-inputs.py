from machine import Pin, ADC
from time import sleep

pot = ADC(Pin(26))

conversion_factor = 3.3 / (2**16 - 1)

while True:
  voltage = pot.read_u16() * conversion_factor
  print(voltage)

  sleep(0.1)