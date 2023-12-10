from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from .models import *
from datetime import datetime
from dateutil.relativedelta import relativedelta
from rest_framework.exceptions import AuthenticationFailed
from datetime import datetime, timezone

import jwt
from sbd_django.settings import JWT_SIGNING_KEY, PROVIDER_PORTAL_ID, PROVIDER_PORTAL_KEY, PROVIDER_POTAL_URL



def getId(request):
    cookie_value = request.COOKIES.get('access_token', None)

    if not cookie_value:
        raise AuthenticationFailed('Unauthenticated')

    try:
        payload = jwt.decode(cookie_value, str(
            JWT_SIGNING_KEY), algorithms=['HS256'])
    except jwt.ExpiredSignatureError:
        raise AuthenticationFailed('Unauthenticated')

    return payload["id"]


@api_view(["GET"])
def getSmartMeter(request):
    smartmeter = Smartmeter.objects.filter(customer_id=getId(request)).values()
    return Response({"data": smartmeter})


@api_view(["GET"])
def getSmartMeterById(request, smartmeter_id):
    smartmeter = Smartmeter.objects.filter(
        smartmeter_id=smartmeter_id).values()
    return Response({"data": smartmeter})



@api_view(["GET"])
def getContractData(request, smartmeter_id):
    smartmeter = Smartmeter.objects.get(smartmeter_id=smartmeter_id)
    contract_data = Contracts.objects.get(contract_id=smartmeter.contract_id)
    contract_data_json = contract_data.toJson()
    contract_data_json["contract_start"] = smartmeter.contract_start

    min_end_date = smartmeter.contract_start + \
        relativedelta(months=contract_data.minimum_term)

    contract_data_json["contract_end"] = min_end_date
    return Response({"data": contract_data_json})


@api_view(["GET"])
def getMeasurements(request, smartmeter_id):
    try:
        smartmeter_provider_id = Smartmeter.objects.get(smartmeter_id=smartmeter_id).provider_portal_UID

        curr_time = datetime.now(timezone.utc).astimezone()
        curr_time = str(curr_time.replace(second=0, microsecond=0).isoformat())

        url = PROVIDER_POTAL_URL + "meter-measurements"
        params = {
            'customerUID': '0cb09f61-c3b9-44d0-b3fc-cd917430660d',
            'meterUID': smartmeter_provider_id,
            'startTime': '2022-12-10T10:00:00+00:00',
            'endTime': curr_time,
            'dataInterval': '86400'
        }

        headers = {
            'Content-Type': 'application/json', 
            'Authorization': 'Bearer ' + str(PROVIDER_PORTAL_KEY)
        }

        response = requests.get(url, params=params, headers=headers, verify=False)

        jResponse = response.json()
    
        values_list = [(datetime.strptime(entry["time"], '%Y-%m-%dT%H:%M:%S%z'), entry["value"]) for entry in jResponse.get("data") if entry.get("value") is not None]

        curr_val = round(values_list[-1][1],2)

        values = {}
        
        for time, value in values_list:
            if time.hour in values:
                values[time.month] += [value]
            else:
                values[time.month] =  [value]

        avgs = {}
        last_value = 0
        for key, vals in values.items():
            if len(vals) == 1:
                avgs[key] = round(vals[0] - last_value,2)
            else:
                avgs[key] = round(vals[-1] - vals[0],2)
            last_value = vals[-1]

        month_avg = round(sum(avgs.values()) / len(avgs),2)

        response_data = {"month_values": avgs, "curr_val": curr_val, "month_avg": month_avg}
        
        return Response({"data": response_data})
    except Exception as e:
        print(jResponse)
        return Response({"data": []})
        raise ValueError(e)
 

    
    
   


@api_view(["GET"])
def getMeasurementsByDate(request, date):
    measurements = Measurements.objects.filter(
        smartmeter_id=2, date=date).values()
    return Response({"data": measurements})


@api_view(["GET"])
def getMeasurementsValues(request, smartmeter_id):
    measurements = Measurements.objects.filter(smartmeter_id=2).values("value")
    return Response({"data": measurements})


class CustomersView(APIView):
    def get(self, request):

        customer_data = Customers.objects.get(customer_id=getId(request))
        return Response({"data": customer_data.toJson()})

    def post(self, request):
        data = request.data
        last_name = data.get("last_name", None)
        first_name = data.get("first_name", None)
        adress = data.get("adress", None)
        house_number = data.get("house_number", None)
        post_code = data.get("post_code", None)

        customerData = Customers.objects.get(customer_id=getId(request))

        if not last_name or not first_name or not adress or not house_number or not post_code:
            return Response({"error": "All values must be filled"}, status=401)

        customerData.last_name = last_name
        customerData.first_name = first_name
        customerData.adress = adress
        customerData.house_number = house_number
        customerData.post_code = post_code
        customerData.save()

        return Response({"message": "Customer data has been updated successfully."}, status=201)
