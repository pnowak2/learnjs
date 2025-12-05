from flask import Flask, render_template, url_for, request, redirect
import csv

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

    # write_to_file(data)
    write_to_csv(data)
  
    return redirect('/thank-you.html')
  else:
    return 'something went wrong, try again.'

def write_to_file(data):
  with open('db.txt', mode='a') as db:
    email = data.get('email')
    subject = data.get('subject')
    message = data.get('message')

    file = db.write(f'\n{email},{subject},{message}')

def write_to_csv(data):
  with open('db2.txt', mode='a') as db2:
    email = data.get('email')
    subject = data.get('subject')
    message = data.get('message')

    csv_writer = csv.writer(db2, delimiter=',', quotechar='"', quoting=csv.QUOTE_MINIMAL)
    csv_writer.writerow([email, subject, message])

if __name__ == '__main__':
  app.run(debug=True)