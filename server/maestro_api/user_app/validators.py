import re 
from django.core.exceptions import ValidationError
from datetime import date

def validate_zip(value):
    if not re.fullmatch(r"\d{5}", value):
        raise ValidationError('Zip code must be 5 digits.')
    
def validate_dob(value):
    if value > date.today():
        raise ValidationError("Date of birth cannot be in the future.")