import smtplib
from email.message import EmailMessage, Message

email = EmailMessage()
email['from'] = 'Piotr Nowak'
email['to'] = 'p.nowak2@gmail.com'
email['subject'] = 'Testing Python'

email.set_content('Testing pythong emailing')

with smtplib.SMTP(host='smtp.gmail.com', port=587) as smtp:
    smtp.ehlo()
    smtp.starttls()
    smtp.login('piotr.andrzej.nowak.ec@gmail.com', 'Maj280580')

    smtp.send_message(email)
    print('done!')