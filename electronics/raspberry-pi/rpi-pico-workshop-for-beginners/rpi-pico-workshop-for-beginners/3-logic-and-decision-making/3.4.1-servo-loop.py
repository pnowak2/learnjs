from machine import Pin, PWM
from time import sleep
from lib.servo import Servo 

servo = Servo(pin_id=16)

while True:
  for angle in range(0, 180, 1):
    servo.write(angle)
    sleep(0.01)

  for angle in range(180, 0, -1):
    servo.write(angle)
    sleep(0.01)