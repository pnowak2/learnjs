import sys

print(f'hi {sys.argv[1]}, {sys.argv[2]}')

# (base) pnowak@Mac sys % python3 argv.py -a -b --help=yes
# ['argv.py', '-a', '-b', '--help=yes']