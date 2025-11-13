import random
from time import sleep
from machine import Pin

button = Pin(15, Pin.IN, Pin.PULL_DOWN)

number = 6

while number > 0:
  number = random.randint(1, 1000)

  if button.value() == 1:
    break

  print(number)
  sleep(0.1)

print('the loop is finished.')