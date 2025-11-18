import smtplib
from email.message import EmailMessage
from string import Template
from pathlib import Path

html = Template(Path('index.html').read_text())

email = EmailMessage()
email['from'] = 'Piotrek'
email['to'] = 'biuro@domi-soft.com'
email['subject'] = 'Testing pythong email api'

email.set_content(html.substitute({'name': 'AI Agent'}), 'html')

with smtplib.SMTP(host='smtp.gmail.com', port=587) as smtp:
  smtp.ehlo()
  smtp.starttls()
  smtp.login('p.nowak2@gmail.com', 'avon vpfa dlyd wked')
  smtp.send_message(email)

  print('done')

