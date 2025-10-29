from machine import Pin
import time
from lib.servo import Servo

my_servo = Servo(pin_id=17)

while True:
  my_servo.write(0)
  print('0')
  time.sleep(1)
  my_servo.write(90)
  print('90')
  time.sleep(1)
  my_servo.write(180)
  print('180')
  time.sleep(1)