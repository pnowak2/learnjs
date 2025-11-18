from time import sleep
from machine import Pin, ADC

pot = ADC(Pin(28))

current_reading = pot.read_u16()
last_reading1 = pot.read_u16()
last_reading2 = pot.read_u16()
last_reading3 = pot.read_u16()
last_reading4 = pot.read_u16()

def update_window():
  global current_reading, last_reading1, last_reading2, last_reading3, last_reading4

  current_reading = pot.read_u16()
  last_reading1 = pot.read_u16()
  last_reading2 = pot.read_u16()
  last_reading3 = pot.read_u16()
  last_reading4 = pot.read_u16()

def calculate_average(*args: int):
  total = sum(args)
  return total / len(args)

while True:
  update_window()
  avg = calculate_average(current_reading, last_reading1, last_reading2, last_reading3, last_reading4)
  print(f'current: {current_reading}, average: {avg}')


  sleep(0.5)