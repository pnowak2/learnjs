import network
import urequests
from time import sleep

ssid = 'iPhone (Piotr)'
password = 'chimera27'

def connect():
  wlan = network.WLAN(network.STA_IF)
  wlan.active(True)
  wlan.connect(ssid, password)

  while wlan.isconnected() == False:
    print("Connecting...")
    sleep(1)

  print(f"Connected, IP: {wlan.ifconfig()[0]}")

try:
  connect() 
  site = "https://swapi.info/api/people"
  print(f"Quering {site}...")

  r = urequests.get(site)
  person = r.json()[0]

  print(person)

  r.close()
except OSError as e:
  print("Error occured", e)
  r.close()
