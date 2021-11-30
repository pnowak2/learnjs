from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('./index.html')

@app.route('/<string:page_name>')
def page(page_name):
    return render_template(f'./{page_name}.html')

@app.route('/submit-form', methods=['POST', 'GET'])
def submit_form():
    return 'form submitted'

@app.route('/<username>/<int:id>')
def user(username=None, id=None):
    return render_template('./index.html', name=username, id=id)

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

@app.route('/blog/2020/dogs')
def blogs_2020():
    return '''
    this is my dog
    '''