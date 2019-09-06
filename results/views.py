import csv
import os
from rest_framework.views import APIView
from rest_framework.response import Response
# from pprint import pprint
import requests
from .serializers import CrewSerializer, WriteStartTimesSerializer, StartTimesSerializer
from .models import Crew, StartTime


class CrewDataImport(APIView):

    def get(self, _request):

        Meeting = os.getenv("MEETING") # Competition Meeting API from the Information --> API Key menu
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
                Crew.objects.get_or_create(name=crew['name'])

            crews = Crew.objects.all()
            serializer = CrewSerializer(crews, many=True)
            return Response(serializer.data)

        return Response(status=400)


class CrewStartRaceTimes(APIView):

    def get(self, _request):

        script_dir = os.path.dirname(__file__) #<-- absolute dir the script is in
        rel_path = "csv/start_times.csv"
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
                    }
                    serializer = WriteStartTimesSerializer(data=data)
                    serializer.is_valid(raise_exception=True)
                    serializer.save()

            start_times = StartTime.objects.all()

            serializer = StartTimesSerializer(start_times, many=True)
            return Response(serializer.data)



class CrewListView(APIView): # extend the APIView

    def get(self, _request):
        crews = Crew.objects.all() # get all the crews
        serializer = CrewSerializer(crews, many=True)

        return Response(serializer.data) # send the JSON to the client


class CrewDetailView(APIView): # extend the APIView

    def get(self, _request, pk):
        crew = Crew.objects.get(pk=pk) # get a book by id (pk means primary key)
        serializer = CrewSerializer(crew)

        return Response(serializer.data) # send the JSON to the client
