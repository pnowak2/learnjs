from machine import Pin, UART
import time

test_uart = UART(1, baudrate=9600, tx=Pin(4), rx=Pin(5))

while True:
  test_uart.write('ON') # only strings are supported!
  time.sleep(1)

  test_uart.write('OFF')
  time.sleep(1)