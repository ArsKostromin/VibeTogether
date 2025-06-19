from django.urls import path
from .views import (
    EventListAPIView,
    EventDetailAPIView,
    EventCreateAPIView,
    JoinEventAPIView,
)

urlpatterns = [
    path('events/', EventListAPIView.as_view(), name='event-list'),
    path('events/<int:pk>/', EventDetailAPIView.as_view(), name='event-detail'),
    path('events/create/', EventCreateAPIView.as_view(), name='event-create'),
    path('events/<int:pk>/join/', JoinEventAPIView.as_view(), name='event-join'),
]
