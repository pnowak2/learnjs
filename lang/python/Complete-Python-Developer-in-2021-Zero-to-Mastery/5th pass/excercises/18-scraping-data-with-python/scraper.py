import requests
from bs4 import BeautifulSoup

res = requests.get('https://news.ycombinator.com/news')
soup = BeautifulSoup(res.text, 'html.parser')

links = soup.select('.titleline > a')
subtext = soup.select('.subtext')

def create_custom_hn(links, subtext):
  hn = []

  for idx, item in enumerate(links):
    title = item.getText()
    href = item.get('href', None)
    vote = subtext[idx].select('.score')

    if len(vote):
      points = int(vote[0].getText().replace(' points', ''))
      hn.append({'title': title, 'link': href, 'points': points})

  return hn

result = create_custom_hn(links, subtext)
print(result)