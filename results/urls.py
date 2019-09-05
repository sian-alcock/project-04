from django.urls import path
from .views import CrewListView, CrewStartTimes, CrewDataImport

urlpatterns = [
    path('crews/', CrewListView.as_view()),
    path('crew-start-times/', CrewStartTimes.as_view()),
    path('crew-data-import/', CrewDataImport.as_view()),
]
