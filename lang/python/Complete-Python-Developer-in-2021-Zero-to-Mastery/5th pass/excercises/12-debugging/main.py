import pdb

# set trace stops debugger at given line
# type help then to learn what u can do there more.

def add(a, b):
  pdb.set_trace()
  return a + b

print(add(3, 7))