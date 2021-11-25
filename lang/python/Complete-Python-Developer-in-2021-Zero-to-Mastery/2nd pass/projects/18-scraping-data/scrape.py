import requests
from bs4 import BeautifulSoup
import pprint

response = requests.get('http://news.ycombinator.com/news')
soup = BeautifulSoup(response.text, 'html.parser')
links = soup.select('.titlelink')
subtext = soup.select('.subtext')

def create_custom_hn(links, subtext, rank=100):
    hn = []
    for idx, item in enumerate(links):
        title = item.getText()
        href = item.get('href', None)
        vote = subtext[idx].select('.score')
        if len(vote):
            points = int(vote[0].getText().replace(' points', ''))
            hn.append({'title': title, 'link': href, 'votes': points})

    return sorted(
        list(filter(lambda item : item['votes'] > rank, hn)), 
        key=lambda item: item['votes'], 
        reverse=True
    )

results = create_custom_hn(links, subtext, 200)
with open('results.txt', 'w') as file:
    file.write(str(results))

pprint.pprint(results)