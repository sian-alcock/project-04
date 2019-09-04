from django.urls import path
from .views import CrewListView

urlpatterns = [
    path('', CrewListView.as_view()),
]
