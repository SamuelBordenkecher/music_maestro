from math import radians, sin, cos, sqrt, atan2

def miles_between(lat1, lng1, lat2, lng2):
    R = 3958.8
    dif_lat = radians(lat2 - lat1)
    dif_lng = radians(lng2 - lng1)

    a = sin(dif_lat / 2)**2 + cos(radians(lat1)) * cos(radians(lat2)) * sin(dif_lng / 2)**2
    c = 2 * atan2(sqrt(a), sqrt(1 - a))

    return round(R * c, 2)