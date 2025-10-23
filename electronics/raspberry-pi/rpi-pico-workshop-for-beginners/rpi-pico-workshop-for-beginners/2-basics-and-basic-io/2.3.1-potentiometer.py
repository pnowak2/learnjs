from machine import Pin, ADC, PWM
import time

led = PWM(Pin(16))
pot = ADC(Pin(26))
switch = Pin(15, Pin.IN)

led.freq(1000)

while True:
  potValue = pot.read_u16()
  print(potValue)

  led.duty_u16(potValue)

