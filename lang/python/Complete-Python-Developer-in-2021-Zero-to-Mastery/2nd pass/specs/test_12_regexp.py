import re

class TestRegularExpressions:
    def test_intro(self):
        string = 'search inside of this text please!'

        assert ('search' in string) == True

    def test_search_for_string_pattern(self):
        string = 'search inside of this text please!'

        match = re.search('this', string)

        assert(match.span()) == (17, 21)
        assert(match.start()) == 17
        assert(match.end()) == 21 
        assert(match.group()) == 'this' 
        
    def test_search_for_pattern_with_re_compile(self):
        string = 'search inside of this text please this!'

        pattern = re.compile('this')
        match = pattern.search(string)
        found_items = pattern.findall(string)
        is_full_match = pattern.fullmatch(string)

        assert(match.span()) == (17, 21)
        assert(match.start()) == 17
        assert(match.end()) == 21 
        assert(match.group()) == 'this' 
        assert found_items == ['this', 'this']
        assert is_full_match == None

    def test_patterns(self):
        string = 'search inside of this text please this!'

        pattern = re.compile(r"([a-zA-Z]).(a)")
        a = pattern.search(string)

        assert a.group() == 'sea'
        assert a.group(1) == 's'
        assert a.group(2) == 'a'

    def test_email_validator(self):
        pattern = re.compile(r'\b([A-Za-z0-9._%+-]+)@([A-Za-z0-9.-]+\.[A-Z|a-z]{2,})\b')
        assert pattern.fullmatch('p.nowak2@gmail.com') is not None
        assert pattern.fullmatch('p.nowak2gmail.com') is None

        assert pattern.fullmatch('andy@ms.com') is not None
        assert pattern.search('andy@ms.com').group(1) == 'andy'
        assert pattern.search('andy@ms.com').group(2) == 'ms.com'