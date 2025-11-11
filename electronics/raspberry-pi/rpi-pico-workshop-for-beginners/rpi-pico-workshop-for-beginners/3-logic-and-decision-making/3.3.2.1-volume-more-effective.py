from machine import Pin, ADC
from time import sleep
from math import floor

POT_PIN = 26
volume_raw = ADC(Pin(POT_PIN))
volume_coefficient = 100 / 65535

while True:
  rawVolume = volume_raw.read_u16()
  volume =  100 - floor(rawVolume * volume_coefficient)

  num_bars = floor(volume / 10)
  print("█" * num_bars + "_" * (10 - num_bars), volume)

  sleep(0.1)