import os
from rest_framework import serializers
import requests
from .models import Crew, Start_Time

class CrewSerializer(serializers.ModelSerializer):

    class Meta:
        model = Crew
        fields = ('id', 'name',)

class CrewDataImportSerializer(serializers.ModelSerializer):
    class Meta:
        model = Crew
        fields = ('id', 'name',)


class CrewStartTimesSerializer(serializers.ModelSerializer):

    class Meta:
        model = Start_Time
        fields = ('id', 'start_sequence', 'bib_number', 'start_tap',)
