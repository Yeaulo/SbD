from django.db import models

# Create your models here.


class Kunde(models.Model):
    kundennummer_id = models.IntegerField(max_length=10, primary_key=True)
    name = models.CharField(max_length=200)
    vorname = models.CharField(max_length=200)
    strasse = models.CharField(max_length=200)
    hausnummer = models.IntegerField()
    plz = models.IntegerField()


class Vertaege(models.Model):
    vertragsnummer_id = models.IntegerField(max_length=10, primary_key=True)
    preis_pro_monat = models.IntegerField()
    bezeichnung = models.CharField(max_length=200)
    Mindestlaufzeit = models.IntegerField(default=12)
    Kündigungsfrist = models.IntegerField(default=3)


class Smartmeter(models.Model):
    smartmeter_id = models.IntegerField(max_length=10, primary_key=True)
    kundennummer_id = models.ForeignKey(Kunde, on_delete=models.CASCADE)
    vertragsnummer_id = models.ForeignKey(Vertaege, on_delete=models.CASCADE)
    vertragsstart = models.DateField()
    straße = models.CharField(max_length=200)
    hausnummer = models.IntegerField()
    plz = models.IntegerField()


class Messdaten(models.Model):
    messdaten_id = models.IntegerField(max_length=10, primary_key=True)
    smartmeter_id = models.ForeignKey(Smartmeter, on_delete=models.CASCADE)
    messwert = models.IntegerField()
    messdatum = models.DateField()
