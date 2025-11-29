from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def hello_world():
  return render_template('index.html')

@app.route('/about')
def about():
  return render_template('about.html')

# @app.route('/favicon.ico')
# def favicon():
#   return 'Blog'

@app.route('/blog/2025/dogs')
def blog2():
  return 'Dogs'

if __name__ == '__main__':
  app.run(debug=True)