import requests

api_url = "https://api.openai.com/v1/responses"
headers = {
    "Content-Type": "application/json",
    # "Authorization": "Bearer KEY",
}

data = '''{
    "model": "gpt-5",
    "input": "Write a one-sentence bedtime story about a unicorn."
}
'''

res = requests.post(api_url, headers=headers, data=data)

print(res)