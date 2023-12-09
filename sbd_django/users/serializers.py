from rest_framework import serializers
from django.contrib.auth.password_validation import validate_password
from .models import User


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    class Meta:
        model = User
        fields = ['id', 'name', 'email', 'password', 'first_name']
        extra_kwargs = {
            'password': {'write_only': True}
        }
    
    def validate_password(self, value):
        validate_password(value)
        return value

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        email = validated_data.get('email', None)

        instance = self.Meta.model(username = email,**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()

        return instance