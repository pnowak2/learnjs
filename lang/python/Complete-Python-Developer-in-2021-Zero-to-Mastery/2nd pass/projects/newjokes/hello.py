import pyjokes

# pip install virtualenv
# $ python3 -m venv env
# run activate script from scripts or bin
# pip install dependency, it will be put in venv lib/site-packages folder

print(pyjokes.get_joke(category='chuck'))