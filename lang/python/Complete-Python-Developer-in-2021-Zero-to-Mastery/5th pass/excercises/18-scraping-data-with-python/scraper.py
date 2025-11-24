import requests
from bs4 import BeautifulSoup
import pprint
import sys

args = sys.argv
page = 1

if(len(args) > 1):
  page = args[1]

res = requests.get(f'https://news.ycombinator.com/news?p={page}')
soup = BeautifulSoup(res.text, 'html.parser')

links = soup.select('.titleline > a')
subtext = soup.select('.subtext')

def sort_stories(hnlist):
  return sorted(hnlist, key=lambda item: item['points'], reverse=True)

def create_custom_hn(links, subtext):
  hn = []

  for idx, item in enumerate(links):
    title = item.getText()
    href = item.get('href', None)
    vote = subtext[idx].select('.score')

    if len(vote):
      points = int(vote[0].getText().replace(' points', ''))
      if(points > 99):
        hn.append({'title': title, 'link': href, 'points': points})

  return sort_stories(hn)

result = create_custom_hn(links, subtext)
pprint.pprint(result)