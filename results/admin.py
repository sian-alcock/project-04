from django.contrib import admin
from .models import Crew, StartTime, FinishTime

# Register your models here.

admin.site.register(Crew)
admin.site.register(StartTime)
admin.site.register(FinishTime)
