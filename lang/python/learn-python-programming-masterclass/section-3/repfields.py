age = 40
print("my age is " + str(age) + " years")
print("my age is {0} years".format(age))

print("There are {0} days in {1}, {2}, {3}, {4}, {5}, {6} and {7}"
      .format(31, "jan", "mar", "may", "jul", "aug", "oct", "dec"))

print("jan: {2}, feb: {0}, mar: {2}".format(11, 22, 33))

print()

print("""
jan: {2}, 
feb: {0}, 
mar: {2}
""".format(1, 2, 3))