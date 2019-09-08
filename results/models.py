from django.db import models

# Create your models here.
class Crew(models.Model):
    name = models.CharField(max_length=50)
    id = models.IntegerField(primary_key=True)
    composite_code = models.CharField(max_length=10)
    club_id = models.IntegerField(blank=True, null=True)
    rowing_CRI = models.IntegerField(blank=True, null=True)
    rowing_CRI_max = models.IntegerField(blank=True, null=True)
    sculling_CRI = models.IntegerField(blank=True, null=True)
    sculling_CRI_max = models.IntegerField(blank=True, null=True)
    event_id = models.IntegerField(blank=True, null=True)
    status = models.CharField(max_length=20)
    penalty = models.IntegerField(default=0)
    handicap = models.IntegerField(default=0)
    manual_override_time = models.IntegerField(blank=True, null=True)
    bib_number = models.IntegerField(blank=True, null=True)

    def __str__(self):
        return self.name

class StartTime(models.Model):
    sequence = models.IntegerField()
    bib_number = models.IntegerField(blank=True, null=True,)
    tap = models.CharField(max_length=10)
    time_tap = models.BigIntegerField()
    crew_id = models.ForeignKey(Crew, related_name='times',
    on_delete=models.SET_NULL,
    blank=True,
    null=True,)

    # @property
    # def raw_time(self):
    #     return finish_time - start_time
