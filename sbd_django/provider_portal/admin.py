from django.contrib import admin
from provider_portal.models import Customers, Contracts, Smartmeter, Measurements


class SmartmeterAdmin(admin.ModelAdmin):
    exclude = ('provider_portal_UID',)
admin.site.register(Customers)
admin.site.register(Contracts)
admin.site.register(Smartmeter, SmartmeterAdmin)
admin.site.register(Measurements)