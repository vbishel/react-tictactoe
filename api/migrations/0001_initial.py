# Generated by Django 5.0.6 on 2024-07-15 05:10

import api.models
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Room',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('code', models.CharField(default=api.models.generate_unique_code, max_length=8, unique=True)),
                ('host', models.CharField(max_length=50, unique=True)),
                ('host_symbol', models.CharField(default='X', max_length=1)),
                ('wins_to_end', models.IntegerField(default=1)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('player', models.CharField(default=None, max_length=50, null=True, unique=True)),
            ],
        ),
    ]
