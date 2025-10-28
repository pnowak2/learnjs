import re

class TestRegularExpressions:
  def test_simple_in(self):
    string = 'search inside of this text please!'

    assert(('search' in string) == True)

  def test_match_object(self):
    string = 'search inside of this text please!'
    match_object = re.search('this', string)

    assert(match_object.start() == 17)
    assert(match_object.end() == 21)
    assert(match_object.group() == 'this')

  def test_match_object_no_match(self):
    string = 'search inside of this text please!'
    match_object = re.search('thIs', string)

    assert(match_object is None)

  def test_match_compile_pattern(self):
    string = 'search this inside of this text please!'
    pattern = re.compile('this')

    match = pattern.search(string)
    assert(match.start() == 7)
    assert(match.end() == 11)

    matches = pattern.findall(string)
    assert(matches == ['this', 'this'])

  def test_full_match(self):
    string = 'search this inside of this text please!'
    pattern = re.compile('search this inside of this text please!')

    full_match = pattern.fullmatch(string)

    assert(full_match)

  def test_match_which_tries_match_beginning_of_string(self):
    string = 'search this inside of this text please!'
    pattern = re.compile('search')

    match = pattern.match(string)

    assert(match)

class TestAdvancedRegespressions:
  def test_popular_matches(self):
    assert(re.compile('\d{2}').search('hello 52 guys'))
    assert(re.compile('[a-zA-Z]').findall('ab') == ['a', 'b'])
    assert(re.compile('\w+').findall('whats up') == ['whats', 'up'])
    assert(re.compile('([a-zA-Z]).([!])').findall('whats up!') == [('u', '!')])

  def test_raw_string(self):
    # r"", R"" - treat backslashes and other special chars as string literals,
    # not as escape characters
    pattern = re.compile(r"[a-zA-Z].[a]")
    string = "search this inside of this text please!"

    result = pattern.search(string)

    assert(result.group() == 'sea')

class TestEmailValidation:
  def test(self):
    email_regexp = r'^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$'
    pattern = re.compile(email_regexp)

    assert(pattern.match('p.nowak2@gmail.com'))
    assert(pattern.match('p.nowak2gmail.com') is None)

class TestPasswordValidation:
  def test(self):
    pass_regexp = r'[a-zA-Z0-9$@%#]{8,}'
    pattern = re.compile(pass_regexp)

    assert(pattern.fullmatch('abcdefgi'))
    assert(pattern.fullmatch('abc34fgi'))
    assert(pattern.fullmatch('$123super'))
    assert(pattern.fullmatch('$123super!') is None)
    assert(pattern.fullmatch('abc') is None)
