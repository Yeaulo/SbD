from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import *;
import json;

#Create: Customers.objects.create(last_name="Bene", first_name="Geba", addresss="Augarten", house_number=112, post_code=68165)
#Alle Daten: Customers.objects.all().values()
#Ein Datensatz: Customers.objects.get(customer_id=5) und toJson() aufrufen
#Filter: Customers.objects.filter(customer_id__gt=5).values() : gt = größer, lt = kleiner

@api_view(["GET"])
def getData(request):
    t =  Customers.objects.filter(customer_id__lt=2).values()
    #print(request.POST["data"])
    return Response({"data": t.values()})

@api_view(["POST"])
def getData(request):
    print(request.POST["data"])
    return Response({"data": "passes"})

@api_view(["DELETE"])
def getData(request):
    Customers.objects.filter(customer_id__gt=4).delete()
    return Response({"data": "passes"})