import re
from rest_framework import serializers
from .models import Club, Event, Crew, RaceTime


class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ('id', 'name', 'override_name', 'info', 'type', 'gender',)

class ClubSerializer(serializers.ModelSerializer):
    class Meta:
        model = Club
        fields = ('id', 'name', 'abbreviation', 'index_code', 'colours', 'blade_image',)

class TimeSerializer(serializers.ModelSerializer):

    class Meta:
        model = RaceTime
        fields = ('id', 'sequence', 'bib_number', 'tap', 'time_tap', 'crew_id',)

class CrewSerializer(serializers.ModelSerializer):

    times = TimeSerializer(many=True)

    class Meta:
        model = Crew
        fields = ('id', 'name', 'composite_code', 'club_id', 'rowing_CRI', 'rowing_CRI_max', 'sculling_CRI', 'sculling_CRI_max', 'event_id', 'status', 'penalty', 'handicap', 'manual_override_time', 'bib_number', 'times')


class WriteCrewSerializer(serializers.ModelSerializer):

    class Meta:
        model = Crew
        fields = ('id', 'name', 'composite_code', 'club_id', 'rowing_CRI', 'rowing_CRI_max', 'sculling_CRI', 'sculling_CRI_max', 'event_id', 'status', 'penalty', 'handicap', 'manual_override_time',)

class WriteRaceTimesSerializer(serializers.ModelSerializer):

    time_tap = serializers.CharField(max_length=20)
    crew_id = serializers.CharField(max_length=10)

    class Meta:
        model = RaceTime
        fields = ('id', 'sequence', 'bib_number', 'tap', 'time_tap', 'crew_id',)

    def validate_time_tap(self, value):
        # if time tap format is mm:ss.ms (eg 58:13.04), then add 0: at front
        if re.match(r'^[0-9]{2}:[0-9]{2}.[0-9]{2}', value):
            value = f'0:{value}'

        if not re.match(r'^[0-9]:[0-9]{2}:[0-9]{2}.[0-9]{2}', value):
            raise serializers.ValidationError({'time_tap': 'Problem with time tap format'})

        hrs, mins, secs = value.split(':')
        secs, hdths = secs.split('.')
        # convert to miliseconds
        value = int(hrs)*60*60*1000 + int(mins)*60*1000 + int(secs)*1000 + int(hdths)*10

        return value

    def validate_crew_id(self, value):
        # relies on there being a crew with id 999999 = unknown

        try:
            value = Crew.objects.get(pk=int(value))
        # if crew_id not found, set to crew 999999

        except Crew.DoesNotExist:
            value = Crew.objects.get(pk=999999)

        return value

class RaceTimesSerializer(serializers.ModelSerializer):

    class Meta:
        model = RaceTime
        fields = ('id', 'sequence', 'bib_number', 'tap', 'time_tap', 'crew_id',)

class WriteClubSerializer(serializers.ModelSerializer):

    # id = serializers.CharField(max_length=10)

    class Meta:
        model = Club
        fields = ('id', 'name', 'abbreviation', 'index_code', 'colours', 'blade_image',)

    def validate_id(self, value):

        if not isinstance(value, int):
            raise serializers.ValidationError({'id': 'Problem with ID'})

        return value
