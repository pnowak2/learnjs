picture = [
    [0,0,0,1,0,0,0],
    [0,0,1,1,1,0,0],
    [0,1,1,1,1,1,0],
    [1,1,1,1,1,1,1],
    [0,0,0,1,0,0,0],
    [0,0,0,1,0,0,0],
]

for line in picture:
    for px in line:
        if px == 0:
            print(' ', end='')
        elif px == 1:
            print('*', end='')
    print("\n")