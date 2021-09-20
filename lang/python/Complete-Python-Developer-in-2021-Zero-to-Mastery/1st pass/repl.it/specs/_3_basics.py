def test_dictionary():
  dct = {'a': 1, 'b': 2}
  assert dct['a'] == 1
  assert dct['b'] == 2

def test_set():
  mySet = set([1, 2, 3])
  mySet2 = {2, 3}
  assert mySet2.issubset(mySet)