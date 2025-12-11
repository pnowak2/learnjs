from machine import Pin, I2C
from lib.pico_i2c_lcd import I2cLcd
from time import sleep

i2c = I2C(0, scl=Pin(1), sda=Pin(0))

I2C_ADDR = i2c.scan()[0]

print(f"Found lcd at {I2C_ADDR}")

I2C_NUM_ROWS = 2
I2C_NUM_COLS = 16 

lcd = I2cLcd(i2c, I2C_ADDR, I2C_NUM_ROWS, I2C_NUM_COLS)

lcd.putstr("It's working")
sleep(2)

try:
  while True:
    lcd.show_cursor()
    lcd.clear()

    for idx, letter in enumerate("Hello"):
      lcd.move_to(idx, 0)
      lcd.putstr(letter)
      sleep(0.5)

    lcd.move_to(0, 1)
    lcd.putstr("World!")
    sleep(2)

except KeyboardInterrupt:
  lcd.backlight_off()
  sleep(1)
  lcd.display_off()
  sleep(1)
