from rest_framework import serializers
from .models import User
from django.contrib.auth.password_validation import validate_password
from django.utils.html import escape


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    class Meta:
        model = User
        
        fields = ['id', 'email', 'password']
        extra_kwargs = {
            'password': {'write_only': True}
        }
    

    def create(self, validated_data):
        password = escape(validated_data.pop('password', None))
        email = escape(validated_data.get('email', None))

        validate_password(password)
   
        instance = self.Meta.model(username = email,**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()

        return instance
    