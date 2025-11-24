from machine import SPI, Pin
import time
import random
from lib.sdcard import SDCard
import uos, vfs

# Here we intialise our SPI peripheral, and then send it off to the library to use
spi = SPI(1,sck=Pin(14), mosi=Pin(15), miso=Pin(12))
cs = Pin(13)
sd = SDCard(spi, cs)

# Here we mount the SD card so that our Pico can see it
uos.mount(sd, '/sdcard')
# print(uos.listdir('/sd'))

print("Starting ADC samples")