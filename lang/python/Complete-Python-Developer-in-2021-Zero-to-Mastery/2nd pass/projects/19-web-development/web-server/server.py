from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('./index.html')

@app.route('/<username>/<int:id>')
def user(username=None, id=None):
    return render_template('./index.html', name=username, id=id)

@app.route('/about')
def about():
    return render_template('./about.html')

@app.route('/env')
def environment():
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

@app.route('/blog')
def blog():
    return '''
    Blog
    '''

@app.route('/blog/2020/dogs')
def blogs_2020():
    return '''
    this is my dog
    '''