import random
from time import sleep
from machine import Pin

button = Pin(15, Pin.IN, Pin.PULL_DOWN)

x = 0

while x != 20:
  x = random.randint(0, 20)
  print(x)

  sleep(0.1)