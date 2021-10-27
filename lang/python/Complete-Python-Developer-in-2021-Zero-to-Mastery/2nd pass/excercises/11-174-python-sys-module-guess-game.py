import sys
from random import randint

min = int(sys.argv[1])
max = int(sys.argv[2])
secretNumber = randint(min, max)
guessedNumber = None

print(f'(Secret number is: {secretNumber})')

while guessedNumber is not secretNumber:
    try:
        guessedNumber = int(input("What's the number? "))
    except:
        pass

print(f'You got it, the number is {secretNumber}')