name = input("Please enter your name: ")
age = int(input("Please enter your age, {0}: ".format(name)))
print(age)

# if age >= 18:
#     print("You are old enough to vote")
#     print("Please put an X in the box")
# else:
#     print("Your are NOT old enough to vote. Please come back in {0} years.".format(18-age))

if age < 18:
    print("Your are NOT old enough to vote. Please come back in {0} years.".format(18-age))
elif age == 900:
    print("Sorry, Yoda, you die in Return of the Jedi")
else:
    print("You are old enough to vote")
    print("Please put an X in the box")
