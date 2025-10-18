if __name__ == '__main__':
  print(f'in module: {__name__}') # never prints if called from other file / imported

def sum(a, b):
  return a + b