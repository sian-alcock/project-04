import csv
import os
import requests
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
# from pprint import pprint

from .serializers import CrewSerializer, WriteRaceTimesSerializer, RaceTimesSerializer, WriteCrewSerializer
from .models import Crew, RaceTime


class CrewListView(APIView): # extend the APIView

    def get(self, _request):
        crews = Crew.objects.all() # get all the crews
        serializer = CrewSerializer(crews, many=True)

        return Response(serializer.data) # send the JSON to the client

    def post(self, request):
        serializer = CrewSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)

        return Response(serializer.errors, status=422)


class CrewDetailView(APIView): # extend the APIView

    def get_crew(self, pk):
        try:
            crew = Crew.objects.get(pk=pk)
        except Crew.DoesNotExist:
            raise Http404
        return crew

    def get(self, _request, pk):
        crew = self.get_crew(pk)
        serializer = CrewSerializer(crew)
        return Response(serializer.data)

    def put(self, request, pk):
        crew = self.get_crew(pk)
        crew = Crew.objects.get(pk=pk)
        serializer = CrewSerializer(crew, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)

        return Response(serializer.errors, status=422)

    def delete(self, _request, pk):
        crew = self.get_crew(pk)
        crew = Crew.objects.get(pk=pk)
        crew.delete()
        return Response(status=204)

class CrewDataImport(APIView):

    def get(self, _request):
        # Start by deleting all existing crews
        Crew.objects.all().delete()

        Meeting = os.getenv("MEETING2018") # Competition Meeting API from the Information --> API Key menu
        UserAPI = os.getenv("USERAPI") # As supplied in email
        UserAuth = os.getenv("USERAUTH") # As supplied in email

        header = {'Authorization':UserAuth}
        request = {'api_key':UserAPI, 'meetingIdentifier':Meeting}
        url = 'https://webapi.britishrowing.org/api/OE2CrewInformation' # change ENDPOINTNAME for the needed endpoint eg OE2MeetingSetup

        # OE2CrewInformation
        # OE2ClubInformation
        # OE2MeetingSetup

        r = requests.post(url, json=request, headers=header)
        if r.status_code == 200:
            # pprint(r.json())


            for crew in r.json()['crews']:
                Crew.objects.get_or_create(name=crew['name'], id=crew['id'], composite_code=crew['compositeCode'], club_id=crew['clubId'], rowing_CRI=crew['rowingCRI'], rowing_CRI_max=crew['rowingCRIMax'], sculling_CRI=crew['scullingCRI'], sculling_CRI_max=crew['scullingCRIMax'], event_id=crew['eventId'], status=crew['status'],)

            crews = Crew.objects.all()
            serializer = WriteCrewSerializer(crews, many=True)
            return Response(serializer.data)

        return Response(status=400)


class CrewRaceTimes(APIView):

    def get(self, _request):

        script_dir = os.path.dirname(__file__) #<-- absolute dir the script is in
        rel_path = "csv/race_times.csv"
        abs_file_path = os.path.join(script_dir, rel_path)

        with open(abs_file_path, newline='') as f:
            reader = csv.reader(f)
            next(reader) # skips the first row

            for row in reader:

                if row[1] == '':
                    row[1] = None

                if row[3] == '':
                    row[3] = None

                if row:
                    data = {
                        'sequence': row[0],
                        'bib_number': row[1],
                        'tap': row[3],
                        'time_tap': row[4],
                        'crew_id':row[8]
                    }
                    serializer = WriteRaceTimesSerializer(data=data)
                    serializer.is_valid(raise_exception=True)
                    serializer.save()

            race_times = RaceTime.objects.all()

            serializer = RaceTimesSerializer(race_times, many=True)
            return Response(serializer.data)
