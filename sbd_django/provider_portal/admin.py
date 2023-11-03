from django.contrib import admin
from provider_portal.models import Customers, Contracts, Smartmeter, Measurements
# Register your models here.
admin.site.register(Customers)
admin.site.register(Contracts)
admin.site.register(Smartmeter)
admin.site.register(Measurements)