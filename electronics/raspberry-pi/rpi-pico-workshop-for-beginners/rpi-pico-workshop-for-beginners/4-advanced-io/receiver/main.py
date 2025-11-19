from machine import Pin, UART

led = Pin('LED', Pin.OUT)

test_uart = UART(1, baudrate=9600, tx=Pin(4), rx=Pin(5))

while True:
  if test_uart.any():
    message = test_uart.read().decode()
    print(message)

    if message == 'ON':
      led.on()
    elif message == 'OFF':
      led.off()