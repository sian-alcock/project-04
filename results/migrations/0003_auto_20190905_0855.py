# Generated by Django 2.2.5 on 2019-09-05 07:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('results', '0002_start_time'),
    ]

    operations = [
        migrations.AlterField(
            model_name='start_time',
            name='bib_number',
            field=models.IntegerField(blank=True, null=True),
        ),
    ]
