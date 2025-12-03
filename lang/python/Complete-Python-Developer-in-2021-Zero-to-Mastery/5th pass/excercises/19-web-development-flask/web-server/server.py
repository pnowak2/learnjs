from flask import Flask, render_template, url_for, request

app = Flask(__name__)


@app.route('/')
def home():
  print(url_for('static', filename='favicon.ico'))
  return render_template('index.html')

@app.route('/<string:page_name>')
def html_page(page_name):
  return render_template(page_name)

@app.route('/submit_form', methods=['POST', 'GET'])
def submit_form():
  if(request.method == 'POST'):
    data = request.form.to_dict()
    print(data)

  return 'form submitted'

if __name__ == '__main__':
  app.run(debug=True)