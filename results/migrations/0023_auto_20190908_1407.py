# Generated by Django 2.2.5 on 2019-09-08 13:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('results', '0022_auto_20190908_1242'),
    ]

    operations = [
        migrations.AlterField(
            model_name='club',
            name='abbreviation',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
    ]
