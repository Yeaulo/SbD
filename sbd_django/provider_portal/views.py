from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from .models import *
from datetime import datetime
from dateutil.relativedelta import relativedelta
from rest_framework.exceptions import AuthenticationFailed, ValidationError
from datetime import datetime, timezone
from utils.input_validation import validate_input
from django.utils.html import escape
from dateutil.relativedelta import relativedelta
from jsonschema import validate
from jsonschema.exceptions import ValidationError



import jwt
from sbd_django.settings import JWT_SIGNING_KEY, PROVIDER_PORTAL_ID, PROVIDER_PORTAL_KEY, PROVIDER_POTAL_URL, PROVIDER_CERT_PATH


def getId(request):
    cookie_value = request.headers.get('Authorization').split()[1]

    if not cookie_value:
        raise AuthenticationFailed('Unauthenticated')
    
    try:
        payload = jwt.decode(cookie_value, str(JWT_SIGNING_KEY), algorithms=['HS256'])
    except jwt.ExpiredSignatureError:
        raise AuthenticationFailed('Unauthenticated')
    
    return payload["id"]


def validate_json(j_data, schema_name):
    with open("/home/dhbwsbd/SbD/sbd_django/json_schemas/"+schema_name+".json") as s:
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
    
    

@api_view(["GET"])
def getSmartMeter(request):
    smartmeter = Smartmeter.objects.filter(customer_id=getId(request)).values()
    output= []
    for entry in smartmeter:
        entry["contract_start"] = entry["contract_start"].isoformat()
        output.append(entry)
    if not validate_json(output, "smartmeter-schema-output"):
        return Response({"error": "Internal error"}, status=500)
    return Response({"data": smartmeter.values()})


@api_view(["GET"])
def getContractData(request, smartmeter_id):
    smartmeter = Smartmeter.objects.get(smartmeter_id=smartmeter_id)
    if smartmeter.customer_id != getId(request):
        return Response({"error": "Unauthorized"}, status=401)

    contract_data = Contracts.objects.get(contract_id=smartmeter.contract_id)
    contract_data_json = contract_data.toJson()
    contract_data_json["contract_start"] = smartmeter.contract_start.isoformat()

    min_end_date = smartmeter.contract_start + \
        relativedelta(months=contract_data.minimum_term)

    contract_data_json["contract_end"] = min_end_date.isoformat()

    if not validate_json(contract_data_json, "contractData-schema-output"):
        return Response({"error": "Internal error"}, status=500)
    
    return Response({"data": contract_data_json})


@api_view(["GET"])
def getMeasurements(request, smartmeter_id):
    try:
        smartmeter = Smartmeter.objects.get(smartmeter_id=smartmeter_id)
        if smartmeter.customer_id != getId(request):
            return Response({"error": "Unauthorized"}, status=401)
        smartmeter_provider_id = smartmeter.provider_portal_UID

        
        curr_time = datetime.now(timezone.utc).astimezone()
        start_time = curr_time - relativedelta(years=1)
        curr_time = str(curr_time.replace(second=0, microsecond=0).isoformat())
        start_time = str(start_time.replace(second=0, microsecond=0).isoformat())

        url = PROVIDER_POTAL_URL + "meter-measurements"
        params = {
            'customerUID': '0cb09f61-c3b9-44d0-b3fc-cd917430660d',
            'meterUID': smartmeter_provider_id,
            'startTime': start_time,
            'endTime': curr_time,
            'dataInterval': '86400'
        }

        headers = {
            'Content-Type': 'application/json', 
            'Authorization': 'Bearer ' + str(PROVIDER_PORTAL_KEY)
        }

        response = requests.get(url, params=params, headers=headers, verify=PROVIDER_CERT_PATH)
        

        jResponse = response.json()
      
        with open("/home/dhbwsbd/SbD/sbd_django/json_schemas/measurements-schema-input.json") as s:
            schema = json.load(s)
        
        try:
            validate(jResponse, schema)
        except ValidationError as e:
            return Response({"data": []})
    
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
        
        return Response({"data": []})


class CustomersView(APIView):
    def get(self, request):
        print(request)
        customer_data = Customers.objects.get(customer_id=getId(request))
       
        if not validate_json(customer_data.toJson(), "customerData-schema-output"):
            return Response({"error": "Internal error"}, status=500)

        return Response({"data": customer_data.toJson()})

    def post(self, request):
        print(request.data)
        if not validate_json(request.data, "customerData-schema-input"):
            return Response({'error': "Invalid input"}, status=400)
        
        data = request.data
        last_name = data.get("last_name", None)
        first_name = data.get("first_name", None)
        adress = data.get("adress", None)
        house_number = data.get("house_number", None)
        post_code = data.get("post_code", None)

        customerData = Customers.objects.get(customer_id=getId(request))

        if not last_name or not first_name or not adress or not house_number or not post_code:
            return Response({"error": "All values must be filled"}, status=401)

        customerData.last_name =  escape(last_name)
        customerData.first_name = escape(first_name)
        customerData.adress = escape(adress)
        customerData.house_number = escape(house_number)
        customerData.post_code = escape(post_code)
        customerData.save()

        return Response({"message": "Customer data has been updated successfully."}, status=201)
