from django.urls import path
from .views import CrewListView, CrewStartRaceTimes, CrewDataImport

urlpatterns = [
    path('crews/', CrewListView.as_view()),
    path('crew-start-times/', CrewStartRaceTimes.as_view()),
    path('crew-data-import/', CrewDataImport.as_view()),
]
