def my_gen(number, multiplier):
  for i in range(number):
    yield i * multiplier

lst = [12, 447, 5, 5.6, "hello"]

print(lst)
print(lst[0])
print(lst[2])

for item in lst:
  print(item)

for item in my_gen(10, 3):
  print(item)
