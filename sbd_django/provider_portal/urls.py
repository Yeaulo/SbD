from django.urls import path
from . import views
from .views import CustomersView

urlpatterns = [
    path("customerData/", CustomersView.as_view(),),
    path("smartmeter/", views.getSmartMeter),
    path("contractData/<smartmeter_id>/", views.getContractData),
    path("measurements/<smartmeter_id>/", views.getMeasurements),
    path("measurements/<date>/", views.getMeasurementsByDate),
    path("measurementsValues/", views.getMeasurementsValues),
    path("smartmeter/<smartmeter_id>/", views.getSmartMeterById),
]
