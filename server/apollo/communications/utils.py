def send_message(message):
    print("send_message called")
    print(message["content"])
    print(f"sending to {message['receiver']['phone_number']}")
