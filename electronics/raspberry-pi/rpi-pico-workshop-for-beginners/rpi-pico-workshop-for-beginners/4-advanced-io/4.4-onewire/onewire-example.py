from machine import Pin
import onewire
import ds18x20
import time

dat = Pin(4)
ow = onewire.OneWire(dat)
ds = ds18x20.DS18X20(ow)

roms: bytearray = ds.scan() 
print("Sensors found: ", bytes(roms[0]))

while True:
  ds.convert_temp()
  time.sleep_ms(750)

  for rom in roms:
    print(ds.read_temp(rom), " deg")

  time.sleep(1)