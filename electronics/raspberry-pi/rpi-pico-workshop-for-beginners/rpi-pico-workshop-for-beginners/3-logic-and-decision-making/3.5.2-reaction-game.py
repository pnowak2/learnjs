import random
from time import sleep, sleep_ms, ticks_ms
from machine import Pin

led = Pin('LED', Pin.OUT)
button = Pin(15, Pin.IN, Pin.PULL_DOWN)

while True:
  print('press the button to start the game.')

  led.off()
  button_state = 0

  while button_state == 0:
    button_state = button.value()

  print('ready?')

  sleep(random.randint(2, 5))

  led.on()

  start_time = ticks_ms()

  button_state = 0

  while button_state == 0:
    button_state = button.value()

  led.off()
  end_time = ticks_ms()

  reaction_time = end_time - start_time

  print(f'your reaction time is: {reaction_time}')

  sleep(1)
