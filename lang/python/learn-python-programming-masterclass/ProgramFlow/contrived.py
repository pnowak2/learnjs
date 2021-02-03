numbers = [1, 45, 311, 11, 60]

for number in numbers:
    if number % 8 == 0:
        # reject the list
        print("The numbers are unacceptable")
        break
else:
    print("Numbers are OK.")