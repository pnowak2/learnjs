import requests
import hashlib
import sys

def request_api_data(query_char):
    url = 'https://api.pwnedpasswords.com/range/' + query_char
    res = requests.get(url)
    if res.status_code != 200:
        raise RuntimeError(f'Error fetching: {res.status_code}')
    
    return res

def pwned_api_check(password):
    shapass = hashlib.sha1( password.encode('utf-8') ).hexdigest().upper()
    first5_char, tail = shapass[:5], shapass[5:]
    response = request_api_data(first5_char)

    return get_pass_leaks_count(response, tail)


def get_pass_leaks_count(hashes, hash_to_check):
    hashes = (line.split(':') for line in hashes.text.splitlines())
    for hash, count in hashes:
        if hash == hash_to_check:
            return count
    return 0
        
def main(args):
    for password in args:
        count = pwned_api_check(password)
        if count:
            print(f'password {password} was found {count} times')
        else:
            print('password not found')

    return 'done'

if __name__ == '__main__':
    sys.exit(main(sys.argv[1:]))