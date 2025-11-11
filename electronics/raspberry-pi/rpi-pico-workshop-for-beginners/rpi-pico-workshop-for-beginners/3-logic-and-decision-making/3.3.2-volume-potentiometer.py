from machine import Pin, ADC
from time import sleep
from math import floor

POT_PIN = 26
volume_raw = ADC(Pin(POT_PIN))
volume_coefficient = 100 / 65535

while True:
  rawVolume = volume_raw.read_u16()
  volume =  100 - floor(rawVolume * volume_coefficient)

  if volume < 10:
    print("__________", volume)
  elif 10 < volume < 20:
    print("██________", volume)
  elif 20 < volume < 30:
    print("███_______", volume)
  elif 30 < volume < 40:
    print("████______", volume)
  elif 40 < volume < 50:
    print("█████_____", volume)
  elif 50 < volume < 60:
    print("██████____", volume)
  elif 60 < volume < 70:
    print("███████___", volume)
  elif 70 < volume < 80:
    print("████████__", volume)
  elif 80 < volume < 90:
    print("█████████_", volume)
  elif volume > 90:
    print("██████████", volume)


  sleep(0.1)