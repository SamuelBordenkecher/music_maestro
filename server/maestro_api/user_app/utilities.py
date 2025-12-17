import requests
from maestro_api import settings

def geocode_zip(zip_code):
    url = "https://maps.googleapis.com/maps/api/geocode/json"
    params = {
        "address": zip_code,
        "key": settings.GOOGLE_MAPS_API_KEY,
    }

    response = requests.get(url, params=params, timeout=5)
    data = response.json()

    if data.get("status") != "OK":
        return None, None
    
    location = data["results"][0]["geometry"]["location"]
    return location["lat"], location["lng"]