import smtplib
from email.message import EmailMessage

email = EmailMessage()
email['from'] = 'Piotrek'
email['to'] = 'biuro@domi-soft.com'
email['subject'] = 'Testing pythong email api'

email.set_content('This is sample content')

with smtplib.SMTP(host='smtp.gmail.com', port=587) as smtp:
  smtp.ehlo()
  smtp.starttls()
  smtp.login('p.nowak2@gmail.com', 'avon vpfa dlyd wked')
  smtp.send_message(email)

  print('done')

