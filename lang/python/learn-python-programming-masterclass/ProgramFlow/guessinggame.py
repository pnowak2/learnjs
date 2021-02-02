answer = 5

print("Please guess number between 1 and 10: ")
guess = int(input())

if guess != answer:
    if guess < answer:
        print("Please guess higher")
    else:   # must be greater than answer
        print("Please guess lower")
    guess = int(input())
    if guess == answer:
        print("Well done, you guessed it")
    else:
        print("Sorry, no")
else:
    print("You got it first time")

# if guess < answer:
#     print("Please guess higher")
#     guess = int(input())
#     if guess == answer:
#         print("Well done, you guessed it")
#     else:
#         print("No, sorry")
# elif guess > answer:
#     print("Please guess lower")
#     guess = int(input())
#     if guess == answer:
#         print("Well done, you guessed it")
#     else:
#         print("No, sorry")
# else:
#     print("You got it first time")
