from flask import Flask, render_template, url_for

app = Flask(__name__)


@app.route('/')
def my_home():
  print(url_for('static', filename='favicon.png'))
  return render_template('index.html')

@app.route('/about')
def about():
  return render_template('about.html')

@app.route('/about/<username>')
def user_profile(username = None):
  ctx = {
    'user': username
  }

  return render_template('about.html', **ctx)

@app.route('/blog/<username>/<int:post_id>')
def blog(username = None, post_id = None):
  return render_template('blog.html', user=username, post_id=post_id)

# @app.route('/favicon.ico')
# def favicon():
#   return 'Blog'

@app.route('/blog/2025/dogs')
def blog2():
  return 'Dogs'

if __name__ == '__main__':
  app.run(debug=True)