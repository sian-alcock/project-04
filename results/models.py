from django.db import models

# Create your models here.
class Crew(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name

class Start_Time(models.Model):
    start_sequence = models.IntegerField()
    bib_number = models.IntegerField(blank=True, null=True,)
    start_tap = models.CharField(max_length=10)
