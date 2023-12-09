from django.core.exceptions import ValidationError
from django.utils.translation import gettext as _

class CustomPasswordValidator:
    def validate(self, password, user=None):
        if not any(char.isupper() for char in password):
            raise ValidationError(_("Das Passwort muss mindestens einen Großbuchstaben enthalten."), code='password_no_upper')

        if not any(char in '!@#$%^&*()-_=+[]{};:,.<>?/\\|' for char in password):
            raise ValidationError(_("Das Passwort muss mindestens ein Sonderzeichen enthalten."), code='password_no_special')