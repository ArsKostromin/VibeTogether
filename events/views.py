from django.shortcuts import render
from .models import Events
from django.views import generic
from .services import filter_events_by_title


# Create your views here.
class EventsListView(generic.ListView):
    model = Events
    context_object_name = 'events_list'
    paginate_by = 4
    #фильтрация по названию и жанру игры
    def get_queryset(self):
        query = self.request.GET.get('query')
        return filter_events_by_title(query)
    

class EventDetailView(generic.DetailView):
    model = Events
    