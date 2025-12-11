from machine import Pin, I2C
from lib.lcd.pico_i2c_lcd import I2cLcd
from dht import DHT11, InvalidChecksum
from time import sleep

DHT_PIN = Pin(28, Pin.OUT, Pin.PULL_DOWN)
dht = DHT11(DHT_PIN)

i2c = I2C(0, scl=Pin(1), sda=Pin(0))

# 0x29 for current model i got, can be different, then scan and check
I2C_ADDR = i2c.scan()[0]

print(f"Found lcd at {I2C_ADDR}")

I2C_NUM_ROWS = 2
I2C_NUM_COLS = 16 

lcd = I2cLcd(i2c, I2C_ADDR, I2C_NUM_ROWS, I2C_NUM_COLS)

lcd.putstr("Et funktioniert!")
sleep(2)

try:
  while True:
    temperature = dht.temperature
    humidity = dht.humidity

    lcd.show_cursor()
    lcd.clear()

    lcd.move_to(3, 0)
    lcd.putstr(f"Temp: {temperature}")

    lcd.move_to(2, 1)
    lcd.putstr(f"Humid: {humidity}%")
    sleep(2)

except KeyboardInterrupt:
  lcd.backlight_off()
  lcd.display_off()
