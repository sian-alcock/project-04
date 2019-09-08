from django.urls import path
from .views import CrewListView, CrewDetailView, RaceTimeListView, RaceTimeDetailView, CrewRaceTimesImport, CrewDataImport, EventDataImport, ClubDataImport

urlpatterns = [
    path('crews/', CrewListView.as_view()),
    path('crews/<int:pk>', CrewDetailView.as_view()),
    path('race-times/', RaceTimeListView.as_view()),
    path('race-times/<int:pk>', RaceTimeDetailView.as_view()),
    path('crew-race-times/', CrewRaceTimesImport.as_view()),
    path('crew-data-import/', CrewDataImport.as_view()),
    path('club-data-import/', ClubDataImport.as_view()),
    path('event-data-import/', EventDataImport.as_view()),
    path('', CrewListView.as_view()),
]
