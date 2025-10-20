# can install package in global env
pip3 install pyjokes

# create local virutal environment
python -m venv venv

## This creates a local folder named venv that contains an isolated Python installation.

source venv/bin/activate

# store deps in txt file to recreate on other machines/envs
pip3 freeze > requirements.txt

# restore deps
pip3 install -r requirements.txt