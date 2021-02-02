for i in range(10, 16):
    print("i is now {}".format(i))

for i in range(10):
    print("yay {}".format(i))

for i in range(0, 10, 2):
    print("going by 2 {}".format(i))

for i in range(10, 0, -2):
    print("going by -2 {}".format(i))

age = 20

if age in range(16, 66):
    print("Have a good day at work")
else:
    print("Enjoy your free time")