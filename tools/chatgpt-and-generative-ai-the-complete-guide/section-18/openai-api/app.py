import os
import requests

api_key = os.environ.get('OPENAI_API_KEY')
api_url = "https://api.openai.com/v1/responses"
headers = {
    "Content-Type": "application/json",
    "Authorization": f"Bearer {api_key}",
}

if not api_key:
    raise RuntimeError("Missing OPENAI_API_KEY env variable")

body ={
    "model": "gpt-4o-mini",
    "input": "Write a one-sentence bedtime story about a unicorn."
}

res = requests.post(api_url, headers=headers, data=body)

print(res)