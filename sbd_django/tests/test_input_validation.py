from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
from django.urls import reverse
from users.views import RegisterView, LoginView, LogoutView, ChangePasswordView
import json
from jsonschema import validate
from jsonschema.exceptions import ValidationError
from utils.input_validation import validate_input


def validate_schema(j_data, schema_name):
    with open("./json_schemas/"+schema_name+".json") as s:
        schema = json.load(s)
    try:
        validate(j_data, schema)
    except ValidationError as e:
        return False
    
    if isinstance(j_data, dict):
        if not validate_input(j_data):
            return False
    elif isinstance(j_data, list):
        for entry in j_data:
            if not validate_input(entry):
                return False

    return True

class YourTestClass(TestCase):
    @classmethod
    def setUpTestData(cls):
        pass

    def setUp(self):
        self.client = APIClient()

    def test_api_empty_body_1(self):
        response = self.client.post("LoginView")
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_api_empty_body_2(self):
        response = self.client.post("RegisterView")
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_api_empty_body_3(self):
        response = self.client.post("LogoutView")
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_api_empty_body_4(self):
        response = self.client.post("ChangePasswordView")
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_api_invalid_credentials(self):
        response = self.client.post("LoginView")
        data = {'email': 'testuser@web.de', 'password': 'testpassword'}

        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_api_invalid_credentials_2(self):
        response = self.client.post("LoginView")
        data = {'email': 'testuser@web.de'}

        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_api_invalid_credentials_3(self):
        response = self.client.post("LoginView")
        data = {'password': 'password'}

        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_json_schema_1(self):
        data = {
            "email": "testuser@web.de",
            "password": "t9NVoiyQV2fDPHV",
            "passwordConfirmation": "t9NVoiyQV2fDPHV",
            "first_name": "John",
            "last_name": "Doe",
            "adress": "Main St",
            "house_number": 42,
            "post_code": 12345
        }

        self.assertTrue(validate_schema(data, "register-schema"))
    
    def test_json_schema_2(self):
        data = {
            "email": "t@web.de",
            "password": "t9NVoiyQV2fDPHV",
            "passwordConfirmation": "t9NVoiyQV2fDPHV",
            "first_name": "John",
            "last_name": "Doe",
            "adress": "Main St",
            "house_number": 42,
            "post_code": 12345
        }

        self.assertTrue(validate_schema(data, "register-schema"))

    def test_json_schema_3(self):
        data =  {
            "email": "t@web.de",
            "password": "t9NVoiyQV2fDPHV",
            "passwordConfirmation": "t9NVoiyQV2fDPHV",
            "first_name": "John",
            "last_name": "Doe",
            "adress": "Main St",
            "house_number": "42",
            "post_code": 12345
        }

        self.assertFalse(validate_schema(data, "register-schema"))


    def test_json_schema_5(self):
        data =  {
            "email": "t@web.de",
            "password": "t9NVoiyQV2fDPHV",
            "passwordConfirmation": "t9NVoiyQV2fDPHV",
            "first_name": "John",
            "last_name": "Doe",
            "adress": "Main St",
            "house_number": 42,
            "post_code": 12323
        }

        self.assertTrue(validate_schema(data, "register-schema"))


    def test_json_schema_7(self):
        data =  {
            "email": "t@web.de",
            "password": "t9NVoiyQV2fDPHV",
            "passwordConfirmation": "t9NVoiyQV2fDPHV",
            "first_name": "John",
            "last_name": "Doe",
            "adress": "Main St",
            "house_number": 42,
            "post_code": 12323
        }

        self.assertTrue(validate_schema(data, "register-schema"))

    def test_json_schema_8(self):
        data =  {
        "last_name": "Doe",
        "first_name": "John",
        "adress": "Main St",
        "house_number": 42,
        "post_code": 12345
        }

        self.assertTrue(validate_schema(data, "customerData-schema-input"))

    def test_json_schema_9(self):
        data =  {
            "last_name": "Doe",
            "adress": "123 Main St",
            "house_number": 42,
            "post_code": 12345
            }

        self.assertFalse(validate_schema(data, "customerData-schema-input"))

    def test_json_schema_10(self):
        data =  {
  "last_name": "Doe",
  "first_name": "John",
  "adress": "123 Main St",
  "house_number": 42,
  "post_code": 12345,
  "extra_field": "Extra"
}

        self.assertFalse(validate_schema(data, "customerData-schema-input"))

    def test_json_schema_11(self):
            data =  {
  "last_name": "Doe",
  "first_name": "John",
  "adress": "123 Main St",
  "house_number": "forty-two",
  "post_code": 12345
}

            self.assertFalse(validate_schema(data, "customerData-schema-input"))

    def test_json_schema_12(self):
        data =  {
                "data": [
                    {
                    "time": "2023-01-01T12:00:00Z",
                    "value": 42
                    },
                    {
                    "time": "2023-01-02T14:30:00Z",
                    "value": None
                    }
                ]
                }

        self.assertTrue(validate_schema(data, "measurements-schema-input"))

    def test_json_schema_13(self):
        data =  {
  "data": [
    {
      "value": 42
    },
    {
      "time": "2023-01-02T14:30:00Z",
      "value":None
    }
  ]
}

        self.assertFalse(validate_schema(data, "measurements-schema-input"))

    def test_json_schema_14(self):
        data =  {
  "data": [
    {
      "time": "2023-01-01T12:00:00Z"
    },
    {
      "time": "2023-01-02T14:30:00Z",
      "value": None
    }
  ]
}

        self.assertFalse(validate_schema(data, "measurements-schema-input"))

    def test_json_schema_15(self):
        data =  {
  "data": [
    {
      "time": "2023-01-01T12:00:00Z",
      "value": 42,
      "extra_field": "Extra"
    },
    {
      "time": "2023-01-02T14:30:00Z",
      "value": None
    }
  ]
}

        self.assertFalse(validate_schema(data, "measurements-schema-input"))

    def test_json_schema_16(self):
        data =  {
  "data": [
    {
      "time": "2023-01-01T12:00:00Z",
      "value": "forty-two"
    },
    {
      "time": "2023-01-02T14:30:00Z",
      "value": None
    }
  ]
}

        self.assertFalse(validate_schema(data, "measurements-schema-input"))

    def test_json_schema_17(self):
        data = {
  "current_password": "old_password",
  "new_password": "new_password",
  "new_password_confirmation": "new_password"
}
        self.assertTrue(validate_schema(data, "change-password-schema-input"))

    def test_json_schema_18(self):
        data = {
  "new_password": "new_password",
  "new_password_confirmation": "new_password"
}
        self.assertFalse(validate_schema(data, "change-password-schema-input"))

    def test_json_schema_19(self):
        data = {
  "current_password": "old_password",
  "new_password_confirmation": "new_password"
}
        self.assertFalse(validate_schema(data, "change-password-schema-input"))

   



    






    # def test_false_is_false(self):
    #     print("Method: test_false_is_false.")
    #     self.assertFalse(False)

    # def test_false_is_true(self):
    #     print("Method: test_false_is_true.")
    #     self.assertTrue(False)

    # def test_one_plus_one_equals_two(self):
    #     print("Method: test_one_plus_one_equals_two.")
    #     self.assertEqual(1 + 1, 2)