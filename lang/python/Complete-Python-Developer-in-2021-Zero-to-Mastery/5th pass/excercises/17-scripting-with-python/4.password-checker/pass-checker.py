import requests
import hashlib
import sys

def request_api_data(query_char):
  url = f'https://api.pwnedpasswords.com/range/{query_char}'
  res = requests.get(url)

  if(res.status_code != 200):
    raise RuntimeError(f'Error fetching ({url}): {res.status_code}')

  return res

def get_password_leaks_count(hashes, hash_to_check):
  hashes = (line.split(':') for line in hashes.text.splitlines())

  for h, count in hashes:
    if h == hash_to_check:
      return count

  return 0

def pwned_api_check(password: str):
  hashed = hashlib.sha1(password.encode('utf-8')).hexdigest().upper()
  first5_chars, tail = hashed[:5], hashed[5:]
  res = request_api_data(first5_chars)

  return get_password_leaks_count(res, tail)

def main(args):
  for password in args:
    count = pwned_api_check(password)
    if count:
      print(f'{password}, found {count} times')
    else:
      print(f'password not found')

    return 'done'

if __name__ == '__main__':
  sys.exit(main(sys.argv[1:]))