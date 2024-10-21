import os
import requests
import json
from users.models import User

def send(phone_number, message):
    TIARA_API_KEY = os.getenv('TIARA_API_KEY')
    TIARA_SENDER_ID = os.getenv('TIARA_SENDER_ID')
    URL = os.getenv('TIARA_END_POINT')
    payload = json.dumps({
        "from": TIARA_SENDER_ID,
        "to": phone_number,
        "message": message
        })

    headers = {
        "Authorization": f"Bearer {TIARA_API_KEY}",
        "Content-Type": "application/json",
    }

    response = requests.request("POST", URL, headers=headers, data=payload)
    if response.status_code == 200:
        print("Message sent succesfully")
        # Update the message status
        return 'success'
    else:
        # Update the message status
        print("Message not sent")
        return 'failed'

def send_message(message):
    phone_numbers = User.objects.filter(id__in=message["recipients"]).values_list("phone_number", flat=True)
    for phone_number in phone_numbers:
        send(phone_number, message["content"])
    return
