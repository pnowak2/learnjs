from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('./index.html')

@app.route('/index')
def home_index():
    return render_template('./index.html')

@app.route('/<username>/<int:id>')
def user(username=None, id=None):
    return render_template('./index.html', name=username, id=id)

@app.route('/about')
def about():
    return render_template('./about.html')

@app.route('/contact')
def contact():
    return render_template('./contact.html')

@app.route('/services')
def services():
    return render_template('./services.html')

@app.route('/components')
def components():
    return render_template('./components.html')

@app.route('/project')
def project():
    return render_template('./project.html')


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