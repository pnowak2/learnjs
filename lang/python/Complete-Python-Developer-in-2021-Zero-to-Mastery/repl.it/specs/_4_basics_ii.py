import pytest

def test_ternary_operator():
  is_friend = True
  can_message = 'message allowed' if is_friend else 'not allowed'
  assert can_message == 'message allowed'

  is_friend = False
  can_message = 'message allowed' if is_friend else 'not allowed'
  assert can_message == 'not allowed'

def test_short_circuit():
  is_friend = True
  is_user = False
  
  # Will never check is_user
  if is_friend or is_user:
    pass
  else:
   pytest.fail()

def test_logical_operators():
  # >, <, =, etc
  assert (4 > 5) == False
  assert ('hello' == 'hello') is True
  assert ('a' > 'A') is True
  assert (1 < 2 < 3) is True
  assert (1 >= 1) is True
  assert (1 <= 1) is True
  assert (0 != 0) is False
  assert (0 == 0) is True

def test_not_operator():
  assert (not(True)) is False
  assert (not(1 > 2)) is True

def test_excercise_logical_operators():
  is_magician = False
  is_expert = True
  output = ''

  if is_magician and is_expert:
    output = 'magician'
  elif is_magician and not is_expert:
    output = 'not expert'
  elif not is_magician:
    output = 'not magician'

  assert output == 'not magician'

def test_is_vs_dblequals():
  # == keyword, checks only value, LOOSE

  assert (True == 1) is True # conversion of arguments before check
  assert ('1' == 1) is False
  assert ([] == 1) is False
  assert ([] == []) is True
  assert (10 == 10.0) is True
  assert ([1,2,3] == [1,2,3]) is True

  # is keyword, STRICT, checks by reference, location in memory

  # assert (True is 1) is False # conversion of arguments before check
  # assert ('1' is 1) is False
  # assert ([] is 1) is False
  # assert ([] is []) is False
  # assert (10 is 10.0) is False
  # assert ([1,2,3] is [1,2,3]) is False

def test_for_loop_over_string():
  result = ''
  for item in 'Zero to Mastery':
    result += item

def test_for_loop_over_array():
  result = 0 
  for item in [1, 2, 3]:
    result += item

  assert result == 6

def test_for_loop_over_set():
  result = 0 
  for item in {1, 2, 3}:
    result += item

  assert result == 6

def test_for_loop_over_tuple():
  result = 0 
  for item in (1, 2, 3):
    result += item

  assert result == 6

def test_for_loop_and_last_item():
  for item in (1, 2, 3):
    pass

  assert item == 3

def test_for_loop_nesting():
  result = '' 
  for item in (1, 2):
    for i in ['a', 'b']:
      result += str(item) + i

  assert result == '1a1b2a2b'

def test_iterables():
  # list, dictionary, tuple, set, string are iterables
  # they can be iterated, one by one to check each item in the collection
  pass

def test_dictionary_iterates_over_keys():
  user = {
    'name': 'Golem',
    'age': 5006,
    'can_swim': False
  }
  result = ''

  for item in user:
    result += item
  
  assert result == 'nameagecan_swim'

def test_dictionary_iterates_over_items_returns_tuples():
  user = {
    'name': 'Golem',
    'age': 5006,
    'can_swim': False
  }

  items = {('name', 'Golem'), ('age', 5006), ('can_swim', False)}
  assert set(user.items()) == items

def test_dictionary_iterates_over_keys_returns_iterable_of_keys():
  user = {
    'name': 'Golem',
    'age': 5006,
    'can_swim': False
  }
  result = ''

  for item in user.keys():
    result += item
  
  assert result == 'nameagecan_swim'


def test_dictionary_iterates_over_values_returnss_iterable_of_values():
  user = {
    'name': 'Golem',
    'age': 5006,
    'can_swim': False
  }
  result = ''

  for item in user.values():
    result += str(item)
  
  assert result == 'Golem5006False'

def test_can_unpack_tuple_of_items_inside_loop():
  user = {
    'name': 'Golem',
    'age': 5006,
    'can_swim': False
  }

  result = ''

  for item in user.items():
    key, val = item
    result += key + str(val)

  assert result == 'nameGolemage5006can_swimFalse'

def test_can_unpack_tuple_of_items_in_for_statement():
  user = {
    'name': 'Golem',
    'age': 5006,
    'can_swim': False
  }

  result = ''

  for key, val in user.items():
    result += key + str(val)

  assert result == 'nameGolemage5006can_swimFalse'

def test_simple_counter_excercise():
  my_list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

  sum = 0;
  for num in my_list:
    sum += num;
  
  assert sum == 55
  
def test_range_zero_to_stop():
  rng = range(5)

def test_range_start_to_stop():
  rng = range(0, 5)

def test_range_start_to_stop_and_skip():
  result = ''
  for n in range(0, 10, 2):
    result += str(n)

  assert result == '02468'

def test_range_start_to_stop_and_negative_skip():
  result = ''
  for n in range(10, 0, -2):
    result += str(n)

  assert result == '108642'

def test_iterate_over_range():
  result = ''
  for number in range(0, 5):
    result += str(number)

  assert result == '01234'

def test_iterate_not_caring_for_variable():
  for _ in range(0, 5):
    pass

def test_wrap_range_in_list():
  lst = list(range(3))
  assert lst == [0, 1, 2]

def test_enumarate_string():
  result = []
  for i, char in enumerate('hi'):
    result.append(i)
    result.append(char)
  
  assert result == [0, 'h', 1, 'i']

def test_enumarate_tuple():
  result = '' 
  for i, char in enumerate(('a', 'b', 'c')):
    result += str(i)
    result += str(char)

  assert result == '0a1b2c'

def test_enumarate_list():
  result = '' 
  for i, char in enumerate(['a', 'b', 'c']):
    result += str(i)
    result += str(char)

  assert result == '0a1b2c'

def test_enumarate_starting_from_counter():
  result = '' 
  for i, char in enumerate(['a', 'b', 'c'], 100):
    result += str(i)
    result += str(char)

  assert result == '100a101b102c'

def test_while_loops():
  i = 0
  result = ''
  while i < 5:
    i += 1
    result += str(i)
  
  assert result == '12345'

def test_while_loops_with_break():
  i = 0
  result = ''
  while i < 5:
    i += 1
    result += str(i)
    if i == 2:
      break
  
  assert result == '12'

def test_while_loops_with_else():
  i = 0
  in_else = False
  while i < 5:
    i += 1
  else:  
    in_else = True
  
  assert in_else is True

def test_while_loops_with_break_and_else():
  # else wont evaluate if break run
  # else will only execute if there's no break
  i = 0
  in_else = False
  while i < 5:
    i += 1
    if i == 2:
      break
  else:
    in_else = True
  
  assert in_else is False

def test_while_true():
  trigger = 5
  while(True):
    if(trigger % 2 == 0):
      break
    trigger += 1

def test_for_with_break():
  for cnt in [1, 2, 3]:
    break

def test_for_with_continue():
  for cnt in [1, 2, 3]:
    continue
    pytest.fail() # never fails

def test_pass():
  # thinking about it
  pass # just to have comment above only, does nothing else
  
#--------------------
# Developer fundamentals: IV
#--------------------

def test_excercise_check_duplicates():
  some_list = ['a', 'b', 'c', 'b','d', 'm', 'n', 'n']
  deduped = []
  duplicates = []

  for ch in some_list:
    if(ch not in deduped):
      deduped.append(ch)
    else:
      duplicates.append(ch)

  assert deduped == ['a', 'b', 'c', 'd', 'm', 'n']
  assert duplicates == ['b','n']

# -- functions --

def test_function_declaration():
  def say_hello():
    return 'hello'
  
  assert say_hello() == 'hello'

def test_positional_arguments_vs_parameters():
  # here those are parameters
  def say_hello(name, emoji):
    # here those are arguments
    return f"Hello, {name} {emoji}"
  
  assert (say_hello("Piotr", "😛")) == 'Hello, Piotr 😛' 
  assert (say_hello("Domi", "😛")) == 'Hello, Domi 😛' 

def test_keyword_arguments():
  def say_hello(name, emoji):
    return f"Hello, {name} {emoji}"

  assert (say_hello(emoji="😛", name='Piotr')) == 'Hello, Piotr 😛'

def test_default_parameters():
  def say_hello(name='Piotr', emoji="😛"):
    return f'Hello, {name} {emoji}'

  assert (say_hello()) == 'Hello, Piotr 😛'
  assert (say_hello(emoji='😛')) == 'Hello, Piotr 😛'
  assert (say_hello(name='Piotr')) == 'Hello, Piotr 😛'

# -----
# return
# -----

def test_return_keyword():
  def sum(a, b):
    return a + b

  def no_return_sum(a, b):
    a + b
  
  result = sum(2, 3) 
  assert(result) == 5

  result = no_return_sum(2, 3) 
  assert(result) == None

def test_high_order_functions():
  def add(a, b):
    def fn(c):
      return f'sum: {a + b + c}'
    return fn
  
  result = add(2, 5)(3);

  assert result == 'sum: 10'

def test_method_vs_functions():
  def some_function():
    return 'function'

  class Person:
    def some_method(self):
      return 'method'

  p = Person()
  assert p.some_method() == 'method'
  assert some_function() == 'function'

def test_docstrings():
  def test(a):
    '''
    Info: This function returns param a
    '''
    return a

  assert (test(5)) == 5

def test_get_help_in_runtime():
  pass
  # help(len)
  # print(len.__doc__)

def test_clean_code_before():
  def is_odd_or_even(num):
    if num % 2 == 0:
      return True
    elif num % 2 != 0:
      return False
  
  assert is_odd_or_even(5) == False
  assert is_odd_or_even(6) == True

def test_clean_code_after():
  def is_odd_or_even(num):
    return not(num % 2)
  
  assert is_odd_or_even(5) == False
  assert is_odd_or_even(6) == True

# *args as tuple, args collected in one argument
# can receive any number of arguments
def test_star_args():
  def super_func(*args): # tuple of arguments
    assert args == (1, 2, 3)
    return sum(args)
  assert super_func(1, 2, 3) == 6

# **kwargs as dictionary of key: value pairs
def test_kwargs_keyword_arguments():
  # Rule: params, *args, default params, **kwargs
  def super_func(name, *args, default='hi', **kwargs):
    assert kwargs == { 'num1': 5, 'num2': 10 }
    assert kwargs['num1'] == 5
    assert kwargs['num2'] == 10
    assert name == 'my name'
    assert default == 'boo' # or 'default' if didnt specify it in calling function

    total = 0
    for item in kwargs.values():
      total += item

    return sum(args) + total
  
  assert super_func('my name', 1, 2, 3, default='boo', num1=5, num2=10) == 21

def test_excercise_highest_even():
  def highest_even(li):
    evens = [] 
    
    for ch in li:
      if (ch % 2 == 0):
        evens.append(ch)
    
    return max(evens)
      
  assert highest_even([2, 10, 3, 12, 4, 8, 11]) == 12
  
def test_walrus_operator_without_walrus():
  a = 'hellooo'
  result = None 
 
  if len(a) > 5:
    result = f'too long {len(a)} elements'
  
  assert result == 'too long 7 elements'
  
      
def test_walrus_operator_walrus():
  # assign value expression to value with walrus operator
  a = 'hellooo'
 
  if ((n := len(a)) > 5):
    result = f'too long {n} elements'
    
  assert result == 'too long 7 elements'

def test_another_walrus_operator():
  str = 'hellooooo'
  steps = []
  while (n := len(str) > 1):
    str = str[:-1]
    steps.append(n)
    
  assert str == 'h'
  assert len(steps) == 8
  
def test_scope():
  def some_fun():
    total = 100
  
  # print(total) # illegal, out of scope variable

def test_scope_rules():
  a = 100
  def confusion():
    a = 5
    return a
  
  assert a == 100
  assert confusion() == 5
  
# global variable
total = 0

def test_global_keyword():
  def count():
    global total
    total += 1
    
    return total
  
  count()
  count()
  count()

  assert count() == 4

 # analogy to js arrow functions with access to parent context variables in nested context
def test_nonlocal_keyword():
  def outer():
    x = 'local'
    
    def inner():
      nonlocal x # using variable out of my scope
      x = 'nonlocal' # does not create local variable, writes to parent variable named x
      return x
    return inner()
  
  assert outer() == 'nonlocal'
  
def test_t():
  pass