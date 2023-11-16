from django.urls import path
from . import views
from .views import CustomersView

urlpatterns = [
    path("customerData/", CustomersView.as_view(),),
    path("smartmeter/", views.getSmartMeter),
    path("contractData/<smartmeter_id>/", views.getContractData),
    path("measurements/", views.getMeasurements),
]