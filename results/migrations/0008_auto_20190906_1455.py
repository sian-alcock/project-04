# Generated by Django 2.2.5 on 2019-09-06 13:55

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('results', '0007_auto_20190906_1432'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Finish_Time',
            new_name='FinishTime',
        ),
        migrations.RenameModel(
            old_name='Start_Time',
            new_name='StartTime',
        ),
    ]
