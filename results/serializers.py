import re
from rest_framework import serializers
from .models import Crew, StartTime


class CrewSerializer(serializers.ModelSerializer):

    class Meta:
        model = Crew
        fields = ('id', 'name',)

class CrewDataImportSerializer(serializers.ModelSerializer):
    class Meta:
        model = Crew
        fields = ('id', 'name',)


class WriteStartTimesSerializer(serializers.ModelSerializer):

    time_tap = serializers.CharField(max_length=20)

    class Meta:
        model = StartTime
        fields = ('id', 'sequence', 'bib_number', 'tap', 'time_tap',)

    def validate_time_tap(self, value):
        # if time tap is in this format mm:ss.ms (eg 58:13.04),
        # convert it to 0:mm:ss.ms
        if re.match(r'^[0-9]{2}:[0-9]{2}.[0-9]{2}', value):
            value = f'0:{value}'

        if not re.match(r'^[0-9]:[0-9]{2}:[0-9]{2}.[0-9]{2}', value):
            raise serializers.ValidationError({'time_tap': 'Problem with time tap format'})

        hrs, mins, secs = value.split(':')
        secs, hdths = secs.split('.')
        # convert to miliseconds
        value = int(hrs)*60*60*1000 + int(mins)*60*1000 + int(secs)*1000 + int(hdths)*10

        return value


class StartTimesSerializer(serializers.ModelSerializer):

    class Meta:
        model = StartTime
        fields = ('id', 'sequence', 'bib_number', 'tap', 'time_tap',)
