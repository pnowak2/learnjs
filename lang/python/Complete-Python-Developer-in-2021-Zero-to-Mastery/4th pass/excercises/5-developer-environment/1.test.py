picture = [
    [0, 0, 0, 1, 0, 0, 0],
    [0, 0, 1, 1, 1, 0, 0],
    [0, 1, 1, 1, 1, 1, 0],
    [1, 1, 1, 1, 1, 1, 1],
    [0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0],
]

for line in picture:
    row = ''
    for bit in line:
        row += "*" if bit else " "

    print(row)

for line in picture:
    for bit in line:
        if bit:
            print('*', end='')
        else:
            print(' ', end='')

    print('')
