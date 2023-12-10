import re
from django.core.validators import EmailValidator, RegexValidator
import re
from django.utils.html import escape
from rest_framework.exceptions import ValidationError

def validate_input(request):
    print(request.data)
    for key, value in request.data.items():
        if key == "last_name" or key == "first_name":
            if not check_only_strings(value) or len(value) > 50:
                return False
        elif key == "adress":
            if not check_only_strings(value) or len(value) > 100:
                return False
        elif key == "post_code":
            if value < 10000 or value > 99999:
                return False
        elif key == "house_number":
            if value <= 0 or value > 10000: 
                return False
        elif key == "email":
            if not check_email(value):
                return False
        
    return True


def check_only_strings(input):
    if re.match(r"^[a-zA-Z\s-]*$", input):
        return True
    return False

def check_email(input):
    email_validator = EmailValidator()
    try:
        email_validator(input)
        return True
    except ValidationError:
        return False