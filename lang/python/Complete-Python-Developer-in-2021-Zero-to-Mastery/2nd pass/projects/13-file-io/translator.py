from pathlib import Path, PosixPath
from googletrans import Translator
import codecs

langs = [
            'bg', 'cs', 'da', 'de', 'et', 'el', 'en', 'es',
            'fi', 'fr', 'ga', 'hr', 'hu', 'it', 'lt', 'lv',
            'mt', 'nl', 'pl', 'pt', 'ro', 'sk', 'sl', 'sv',
        ]

translator = Translator()
path = Path('en.json')
with open(path.as_posix(), mode='r') as file:
    sources = file.readlines()
    src = ''.join(sources)

    for lang in langs:
        translation = translator.translate(src, dest=lang)
        with codecs.open(f'translations/{lang}.json', mode='w', encoding='utf-8') as file:
            file.write(translation.text)
