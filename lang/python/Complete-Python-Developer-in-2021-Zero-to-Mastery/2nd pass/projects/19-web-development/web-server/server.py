from flask import Flask

app = Flask(__name__)

@app.route('/')
def hello_world():
    return '''
    <code>
      <pre>
      setup venv to web folder
      set FLASK_ENV=development
      set FLASK_APP=server.py
      flask run
      </pre>
    </code>
    '''