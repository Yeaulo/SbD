from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed, ValidationError
from .serializers import UserSerializer
from .models import User
from provider_portal.models import Customers
from sbd_django.settings import JWT_SIGNING_KEY
from utils.input_validation import validate_input
from django.utils.html import escape
from django.contrib.auth.password_validation import validate_password
import json
from jsonschema import validate
from jsonschema.exceptions import ValidationError

import jwt
import datetime

def getId(request):
    cookie_value = request.COOKIES.get('access_token',None)

    if not cookie_value:
        raise AuthenticationFailed('Unauthenticated')
    
    try:
        payload = jwt.decode(cookie_value, str(JWT_SIGNING_KEY), algorithms=['HS256'])
    except jwt.ExpiredSignatureError:
        raise AuthenticationFailed('Unauthenticated')
    
    return payload["id"]

def validate_json(j_data, schema_name):
    with open("./json_schemas/"+schema_name+".json") as s:
        schema = json.load(s)
    try:
        validate(j_data, schema)
    except ValidationError as e:
        print(e)
        return False
   
    if isinstance(j_data, dict):
        if not validate_input(j_data):
            return False
    elif isinstance(j_data, list):
        for entry in j_data:
            if not validate_input(entry):
                return False

    return True
    

class RegisterView(APIView):
    def post(self, request):
        if not validate_json(request.data, "register-schema"):
            return Response({"error": "Invalid input"}, status=500)
        if request.data.get('password', None) != request.data.get('passwordConfirmation', None):
            return Response({'error': "Passwords doesnt match"}, status=400)
        
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        instance = serializer.save()
        
        Customers.objects.create(customer_id = serializer.data.get('id', None),first_name=escape(request.data.get('first_name', None)), last_name=escape(request.data.get('last_name', None)), adress=escape(request.data.get('adress', None)), house_number=escape(request.data.get('house_number', None)), post_code=escape(request.data.get('post_code', None)))
        
        response = Response(serializer.data)
        response.delete_cookie('isAuthenticated')
        response.delete_cookie('access_token')
        return Response({"data": "Registered successfully"})


class LoginView(APIView):
    def post(self, request):
        if not validate_json(request.data, "login-schema"):
            return Response({"error": "Invalid input"}, status=500)
        try:
            email = request.data['email']
            password = request.data['password']

            user = User.objects.filter(email=email).first()

            if user is None or not user.check_password(password):
                raise AuthenticationFailed('Credentials not valid!')


            payload = {
                'id': user.id,
                'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=60),
                'iat': datetime.datetime.utcnow()
            }

            token = jwt.encode(payload, str(JWT_SIGNING_KEY), algorithm='HS256')

            response = Response()

        
            response.set_cookie(key='access_token', value=token,  max_age=3600, secure=True, httponly=True, domain='localhost', path='/')
            response.set_cookie(key='isAuthenticated', value=True,  max_age=3600, secure=True, domain='localhost', path='/')
            response.data = {
                'data': "logged in",
            }
            return response
        except Exception as e:
            return Response({'error': "Credentials invalid"}, status=400)

class LogoutView(APIView):
    def post(self, request):
        response = Response()
        response.delete_cookie('access_token')
        response.delete_cookie('isAuthenticated')

        response.data = {
            'message': 'logged out'
        }
        return response
    
class ChangePasswordView(APIView):
    def post(self, request):
        try:
            if not validate_json(request.data, "change-password-schema-input"):
                return Response({"error": "Invalid input"}, status=500)
            
            customer_id = getId(request)
            user = User.objects.filter(id=customer_id).first()
          
            if user is None or not user.check_password(request.data.get('current_password', None)):
                raise AuthenticationFailed('Credentials not valid!')
            
            if request.data.get('new_password', None) is None:
                raise ValidationError("Invalid input")

            if request.data.get('new_password', None) != request.data.get('new_password_confirmation', None):
                raise ValidationError("Passwords doesnt match")
            
            validate_password(request.data.get('new_password', None))
            
            user.set_password(request.data.get('new_password', None))
            user.save()

        except (AuthenticationFailed, ValidationError) as e:
            return Response({'error': "Password Reset failed"}, status=400)

        return Response({"data": "Password Reset successful"})
