import os
import time
import json
import requests
from sseclient import SSEClient

from dotenv import load_dotenv
load_dotenv()

RETRY_DELAY = 5  
BASE_URL = os.getenv("API_BASE_URL", "http://localhost:8080")

def post_edit(data):
    url = f"{BASE_URL}/ingest/wikipedia-edit"
    payload = {
        "id": data.get("id"),
        "title": data.get("title"),
        "titleUrl": data.get("title_url"),
        "comment": data.get("comment"),
        "user": data.get("user"),
        "bot": data.get("bot"),
        "notifyUrl": data.get("notify_url"),
        "minor": data.get("minor"),
        "lengthOld": data.get("length", {}).get("old"),
        "lengthNew": data.get("length", {}).get("new"),
        "serverName": data.get("server_name"),
        "wiki": data.get("wiki"),
        "parsedComment": data.get("parsedcomment"),
        "timestamp": data.get("timestamp"),
    }
    headers = {"Content-Type": "application/json"}
    
    response = requests.post(url, headers=headers, json=payload)
    if response.status_code != 201:
        raise Exception(f"Failed to post edit: {response.status_code} {response.text}")
    return response.json()

def connect_to_event_stream(url, attempt_count=1, duration=None):
    """
    Connects to the EventStreams feed and processes incoming events.
    """
    while True:
        try:
            print(f"Connecting to the EventStreams feed (attempt {attempt_count})...")
            client = SSEClient(url)
            
            for event in client:
                try:
                    if event.data:
                        data = json.loads(event.data)
                        if (
                            data.get("server_name") == "en.wikipedia.org" and
                            data.get("type") == "edit" and
                            data.get("title") and
                            ":" not in data.get("title")
                        ):
                            post_edit(data)
                            print(f"edit: {data.get('title')}")
                except json.JSONDecodeError as json_error:
                    print(f"JSON parsing error: {json_error}")
                except Exception as inner_error:
                    print(f"Error processing edit (retrying): {inner_error}")
                    time.sleep(RETRY_DELAY)

        except Exception as outer_error:
            print(f"Error establishing connection: {outer_error}")
            print(f"Retrying connection after {RETRY_DELAY} seconds (attempt {attempt_count + 1})...")
            time.sleep(RETRY_DELAY)
            attempt_count += 1
        
        if duration:
            time.sleep(duration)
            break

def main(duration=None):
    print(BASE_URL)
    url = "https://stream.wikimedia.org/v2/stream/recentchange"
    connect_to_event_stream(url, attempt_count=1, duration=duration)

if __name__ == "__main__":
    try:
        main()
    except Exception as e:
        print(e)
        exit(1)
