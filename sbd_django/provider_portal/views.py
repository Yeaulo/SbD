from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from .models import *
from datetime import datetime
from dateutil.relativedelta import relativedelta

#Create: Customers.objects.create(last_name="Bene", first_name="Geba", addresss="Augarten", house_number=112, post_code=68165)
#Alle Daten: Customers.objects.all().values()
#Ein Datensatz: Customers.objects.get(customer_id=5) und toJson() aufrufen
#Filter: Customers.objects.filter(customer_id__gt=5).values() : gt = größer, lt = kleiner


@api_view(["GET"])
def getSmartMeter(request):
    smartmeter = Smartmeter.objects.filter(customer_id=1).values()
    return Response({"data": smartmeter})

#TODO Auch nach Customer id filtern
@api_view(["GET"])
def getContractData(request, smartmeter_id):
    smartmeter = Smartmeter.objects.get(smartmeter_id=smartmeter_id)
    contract_data = Contracts.objects.get(contract_id=smartmeter.contract_id)
    contract_data_json =  contract_data.toJson()
    contract_data_json["contract_start"] = smartmeter.contract_start

    min_end_date = smartmeter.contract_start + relativedelta(months=contract_data.minimum_term)
    if min_end_date < datetime.now().date():
        min_end_date = datetime.now().date() + relativedelta(months=contract_data.minimum_term)

    contract_data_json["contract_end"] = min_end_date
    return Response({"data": contract_data_json})

@api_view(["GET"])
def getMeasurements(request):
    measurements = Measurements.objects.filter(smartmeter_id=2).values()
    return Response({"data": measurements})


class CustomersView(APIView):
    def get(self, request):
        customer_data = Customers.objects.get(customer_id=2)
        return Response({"data": customer_data.toJson()})

    def post(self,request):
        data =  request.data 
        last_name = data.get("last_name", None)
        first_name = data.get("first_name", None)
        adress = data.get("adress", None)
        house_number = data.get("house_number", None)
        post_code = data.get("post_code", None)

        customerData = Customers.objects.get(customer_id=2)

        if not last_name or  not first_name or not adress or not house_number or not post_code:
            return Response({"error": "All values must be filled"}, status=401)         

        customerData.last_name = last_name
        customerData.first_name = first_name
        customerData.adress = adress
        customerData.house_number = house_number
        customerData.post_code = post_code
        customerData.save()


        return Response({"message": "Customer data has been updated successfully."}, status=201)
    