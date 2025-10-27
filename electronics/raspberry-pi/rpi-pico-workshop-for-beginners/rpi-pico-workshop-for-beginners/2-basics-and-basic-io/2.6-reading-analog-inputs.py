from machine import Pin, ADC
from time import sleep

pot = ADC(Pin(26))

conversion_factor = 3.3 / (2**16 - 1)

while True:
  raw_data = pot.read_u16() # 16 bit precision, 2^16-1 levels
  voltage =  raw_data * conversion_factor
  print(f'raw: {raw_data}, voltage: {voltage}V')

  sleep(0.1)