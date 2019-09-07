from django.urls import path
from .views import CrewListView, CrewDetailView, CrewStartRaceTimes, CrewDataImport

urlpatterns = [
    path('crews/', CrewListView.as_view()),
    path('crews/<int:pk>', CrewDetailView.as_view()),
    path('crew-start-times/', CrewStartRaceTimes.as_view()),
    path('crew-data-import/', CrewDataImport.as_view()),
    path('/', CrewListView.as_view()),
]
