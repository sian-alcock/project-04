from rest_framework.views import APIView # get the APIView class from DRF
from rest_framework.response import Response # get the Response class from DRF

from .models import Crew
from .serializers import CrewSerializer # get the BookSerializer

# Create your views here.
class CrewListView(APIView): # extend the APIView

    def get(self, _request):
        crews = Crew.objects.all() # get all the books
        serializer = CrewSerializer(crews, many=True)

        return Response(serializer.data) # send the JSON to the client


class CrewDetailView(APIView): # extend the APIView

    def get(self, _request, pk):
        crew = Crew.objects.get(pk=pk) # get a book by id (pk means primary key)
        serializer = CrewSerializer(crew)

        return Response(serializer.data) # send the JSON to the client
