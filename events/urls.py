from django.contrib import admin
from django.urls import path, include
from django.urls import re_path
# from .views import 
from django.conf import settings
from django.conf.urls.static import static
# from rest_framework.routers import DefaultRouter
from .views import EventsListView, EventDetailView, EventCreateView, JoinEventView


urlpatterns = [
    path('', EventsListView.as_view(), name='events_list'),
    path('<int:pk>', EventDetailView.as_view(), name='event_detail'),
    path('events/<int:pk>/join/', JoinEventView.as_view(), name='event_join'),
    path('create/', EventCreateView.as_view(), name='event_create'),

]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)