import pdb 

class TestDebug:
    def test_debug(self):
        # linting
        # editor / ide
        # read errors
        pass

    def test_pdb(self):
        # pdb built-in python debugger
        pass

def add(a, b):
    pdb.set_trace()
    tmp = a + b
    return a + b

add(2, 3)
