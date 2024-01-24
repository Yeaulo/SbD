from django.db import models
from django.db.models.signals import pre_save, pre_delete
from django.dispatch import receiver
import requests
from sbd_django.settings import PROVIDER_PORTAL_ID, PROVIDER_PORTAL_KEY, PROVIDER_POTAL_URL
import json
from jsonschema import validate
from jsonschema.exceptions import ValidationError


# Create your models here.
#TODO: Addresss auf adress
class Customers(models.Model):
    customer_id = models.AutoField(max_length=10, primary_key=True)
    last_name = models.CharField(max_length=200)
    first_name = models.CharField(max_length=200)
    adress = models.CharField(max_length=200)
    house_number = models.IntegerField()
    post_code = models.IntegerField()

    def toJson(self):
        return {
            "last_name": self.last_name,
            "first_name": self.first_name,
            "adress": self.adress,
            "house_number": self.house_number,
            "post_code": self.post_code,
        }
    


class Contracts(models.Model):
    contract_id = models.AutoField(max_length=10, primary_key=True)
    price_per_month = models.IntegerField()
    description = models.CharField(max_length=200)
    minimum_term = models.IntegerField(default=12)
    notice_period = models.IntegerField(default=3)

    def toJson(self):
        return {
            "contract_id": self.contract_id,
            "price_per_month": self.price_per_month,
            "description": self.description,
            "minimum_term": self.minimum_term,
            "notice_period": self.notice_period,
        }

class Smartmeter(models.Model):
    smartmeter_id = models.AutoField(max_length=10, primary_key=True)
    customer = models.ForeignKey(Customers, on_delete=models.CASCADE)
    contract = models.ForeignKey(Contracts, on_delete=models.CASCADE)
    contract_start = models.DateTimeField()
    address = models.CharField(max_length=200)
    house_numnber = models.IntegerField()
    post_code = models.IntegerField()
    provider_portal_UID = models.CharField(max_length=200, default="")

@receiver(pre_save, sender=Smartmeter)
def pre_create(sender, instance, **kwargs):
 
    url = PROVIDER_POTAL_URL + "meter-create"
    data = {
        "customerUID": str(PROVIDER_PORTAL_ID)
    }

    headers = {
        'Content-Type': 'application/json', 
        'Authorization': 'Bearer ' + str(PROVIDER_PORTAL_KEY)
    }
    try:
        response = requests.post(url, headers=headers, data=json.dumps(data), verify=False)
        response_data = response.json()
        with open("/home/dhbwsbd/SbD/sbd_django/json_schemas/smartmeter-create-schema.json") as s:
            schema = json.load(s)
        validate(response_data, schema)
        instance.provider_portal_UID = response_data.get("meterUID")
    except requests.exceptions.RequestException as e:
        print(f'Fehler bei der HTTP-Anfrage: {e}')
        raise
    except ValidationError as e:
        print(f'Fehler bei der Validierung: {e}')
        raise

@receiver(pre_delete, sender=Smartmeter)
def pre_delete(sender, instance, **kwargs):
    url = PROVIDER_POTAL_URL + "meter-delete"
    data = {
        "customerUID": str(PROVIDER_PORTAL_ID),
        "meterUID": instance.provider_portal_UID
    }

    headers = {
        'Content-Type': 'application/json', 
        'Authorization': 'Bearer ' + str(PROVIDER_PORTAL_KEY)
    }
    try:
        response = requests.delete(url, headers=headers, data=json.dumps(data), verify=False)
    except requests.exceptions.RequestException as e:
        print(f'Fehler bei der HTTP-Anfrage: {e}')
        raise 

 

class Measurements(models.Model):
    measurement_id = models.AutoField(max_length=10, primary_key=True)
    smartmeter = models.ForeignKey(Smartmeter, on_delete=models.CASCADE)
    value = models.IntegerField()
    timestamp = models.DateField()
