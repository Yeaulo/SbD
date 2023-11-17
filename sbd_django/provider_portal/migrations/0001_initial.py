# Generated by Django 4.2.6 on 2023-11-17 12:12

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Contracts',
            fields=[
                ('contract_id', models.AutoField(max_length=10, primary_key=True, serialize=False)),
                ('price_per_month', models.IntegerField()),
                ('description', models.CharField(max_length=200)),
                ('minimum_term', models.IntegerField(default=12)),
                ('notice_period', models.IntegerField(default=3)),
            ],
        ),
        migrations.CreateModel(
            name='Customers',
            fields=[
                ('customer_id', models.AutoField(max_length=10, primary_key=True, serialize=False)),
                ('last_name', models.CharField(max_length=200)),
                ('first_name', models.CharField(max_length=200)),
                ('adress', models.CharField(max_length=200)),
                ('house_number', models.IntegerField()),
                ('post_code', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='Smartmeter',
            fields=[
                ('smartmeter_id', models.AutoField(max_length=10, primary_key=True, serialize=False)),
                ('contract_start', models.DateField()),
                ('address', models.CharField(max_length=200)),
                ('house_numnber', models.IntegerField()),
                ('post_code', models.IntegerField()),
                ('contract', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='provider_portal.contracts')),
                ('customer', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='provider_portal.customers')),
            ],
        ),
        migrations.CreateModel(
            name='Measurements',
            fields=[
                ('measurement_id', models.AutoField(max_length=10, primary_key=True, serialize=False)),
                ('value', models.IntegerField()),
                ('timestamp', models.DateField()),
                ('smartmeter_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='provider_portal.smartmeter')),
            ],
        ),
    ]
