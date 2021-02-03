import random

highest = 1000
answer = random.randint(1, highest);
guess = 0

print(answer)   # TODO remove after testing
print("Please guess number between 1 and {}: ".format(highest))

while guess != answer:
    guess = int(input())

    if guess == 0:
        break
    if guess == answer:
        print("Well done!")
        break
    elif answer > guess:
        print("Try higher")
    else:
        print("Try lower")

