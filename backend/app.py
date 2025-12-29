import requests
import time

url = "http://127.0.0.1:5000/trigger"  # works if run on same machine as server

# Simulate doorbell alert
data = {"sensor": "doorbell_sensor", "value": "ALERT"}
requests.post(url, json=data)

time.sleep(5)

# Reset to OK
data = {"sensor": "doorbell_sensor", "value": "OK"}
requests.post(url, json=data)
