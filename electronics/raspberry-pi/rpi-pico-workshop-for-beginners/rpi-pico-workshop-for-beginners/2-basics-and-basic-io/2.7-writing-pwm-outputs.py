from machine import Pin, PWM, ADC
from time import sleep

pwm_pin = PWM(Pin(16))
pot_pin = ADC(Pin(28))

max = 2**16 - 1

pwm_pin.freq(1000)


while True:
  # PWM_value = int(0.5 * max)
  PWM_value = pot_pin.read_u16()
  pwm_pin.duty_u16(PWM_value)
  sleep(0.05)
