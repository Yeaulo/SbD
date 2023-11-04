from django.db import models

# Create your models here.


class Customers(models.Model):
    customer_id = models.AutoField(max_length=10, primary_key=True)
    last_name = models.CharField(max_length=200)
    first_name = models.CharField(max_length=200)
    addresss = models.CharField(max_length=200)
    house_number = models.IntegerField()
    post_code = models.IntegerField()

    def toJson(self):
        return {
            "customer_id": self.customer_id,
            "last_name": self.last_name,
            "first_name": self.first_name,
            "addresss": self.addresss,
            "house_number": self.house_number,
            "post_code": self.post_code,
        }

class Contracts(models.Model):
    contract_id = models.AutoField(max_length=10, primary_key=True)
    price_per_month = models.IntegerField()
    description = models.CharField(max_length=200)
    minimum_term = models.IntegerField(default=12)
    notice_period = models.IntegerField(default=3)

class Smartmeter(models.Model):
    smartmeter_id = models.AutoField(max_length=10, primary_key=True)
    customer = models.ForeignKey(Customers, on_delete=models.CASCADE)
    contract = models.ForeignKey(Contracts, on_delete=models.CASCADE)
    contract_start = models.DateField()
    address = models.CharField(max_length=200)
    house_numnber = models.IntegerField()
    post_code = models.IntegerField()



class Measurements(models.Model):
    measurement_id = models.AutoField(max_length=10, primary_key=True)
    smartmeter_id = models.ForeignKey(Smartmeter, on_delete=models.CASCADE)
    value = models.IntegerField()
    timestamp = models.DateField()
