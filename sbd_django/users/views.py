from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from .serializers import UserSerializer
from .models import User
from provider_portal.models import Customers
from sbd_django.settings import JWT_SIGNING_KEY

import jwt
import datetime

class RegisterView(APIView):
    def post(self, request):
        if request.data.get('password', None) != request.data.get('passwordConfirmation', None):
            raise AuthenticationFailed('Passwords do not match!')
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        instance = serializer.save()
        
        Customers.objects.create(customer_id = serializer.data.get('id', None),first_name=request.data.get('first_name', None), last_name=request.data.get('last_name', None), adress=request.data.get('adress', None), house_number=request.data.get('house_number', None), post_code=request.data.get('post_code', None))
        
        response = Response(serializer.data)
        response.delete_cookie('isAuthenticated')
        response.delete_cookie('access_token')
        return Response(serializer.data)


class LoginView(APIView):
    def post(self, request):
        email = request.data['email']
        password = request.data['password']

        user = User.objects.filter(email=email).first()

        if user is None or not user.check_password(password):
            raise AuthenticationFailed('Crednetials not valid!')


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
            'accessToken': token,
            'expiresIn': '3600'
        }
        return response


class UserView(APIView):

    def get(self, request):
        token = request.COOKIES.get('access_token')

        if not token:
            response = Response()
         
            raise AuthenticationFailed('Unauthenticated!')

        try:
            payload = jwt.decode(token, JWT_SIGNING_KEY, algorithms=['HS256'])
        
        except jwt.ExpiredSignatureError:
            response = Response()
            raise AuthenticationFailed('Unauthenticated!')

        user = User.objects.filter(id=payload['id']).first()
        serializer = UserSerializer(user)

        response = Response(serializer.data)
        return Response(serializer.data)


class LogoutView(APIView):
    def post(self, request):
        response = Response()
        response.delete_cookie('access_token')
        response.delete_cookie('isAuthenticated')

        response.data = {
            'message': 'logged out'
        }
        return response