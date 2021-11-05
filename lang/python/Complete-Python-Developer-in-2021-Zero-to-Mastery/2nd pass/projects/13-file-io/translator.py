from pathlib import Path, PosixPath
from googletrans import Translator
import re
import codecs

langs = [ 'bg' ]
# langs = [
#             'bg', 'cs', 'da', 'de', 'et', 'el', 'en', 'es',
#             'fi', 'fr', 'ga', 'hr', 'hu', 'it', 'lt', 'lv',
#             'mt', 'nl', 'pl', 'pt', 'ro', 'sk', 'sl', 'sv',
#         ]

translator = Translator()
path = Path('en.json')

with open(path.as_posix(), mode='r') as file:
    src_lines = file.readlines()
    regex = r'(^\".*:).*(\".*\")'
    pattern = re.compile(regex)
    src_match = pattern.search('"ecl.app-shell.ECL-APP-SHELL": "ECL Application Shell",')

    src_key, src_value = (src_match.group(1), src_match.group(2))

    # print(f'key: {src_key}, value: {src_value}')

    s = re.sub(regex, r"\1" + ' buba', '"ecl.app-shell.ECL-APP-SHELL": "ECL Application Shell",')
    print(s)

    # for lang in langs:
        # translation = translator.translate(src, dest=lang)
        # with codecs.open(f'translations/{lang}.json', mode='w', encoding='utf-8') as file:
        #     print(f'Writing {lang} json translation..')
        #     file.write(translation.text)
