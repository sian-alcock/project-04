from django.db import models

# Create your models here.
class Crew(models.Model):
    name = models.CharField(max_length=50)
    bib_number = models.IntegerField(blank=True, null=True,)

    def __str__(self):
        return self.name

class StartTime(models.Model):
    sequence = models.IntegerField()
    bib_number = models.IntegerField(blank=True, null=True,)
    tap = models.CharField(max_length=10)
    time_tap = models.BigIntegerField()

class FinishTime(models.Model):
    sequence = models.IntegerField()
    bib_number = models.IntegerField(blank=True, null=True,)
    tap = models.CharField(max_length=10)
    time_tap = models.BigIntegerField()

    # @property
    # def raw_time(self):
    #     return finish_time - start_time
