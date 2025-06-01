from django.shortcuts import render
from .models import Events
from django.views import generic
from .services import filter_events_by_title
from django.contrib.auth.mixins import LoginRequiredMixin
from django.views.generic.edit import CreateView
from django.utils.text import slugify


# Create your views here.
class EventsListView(generic.ListView):
    model = Events
    context_object_name = 'events_list'
    paginate_by = 4

    def get_queryset(self):
        query = self.request.GET.get('query')
        return filter_events_by_title(query).filter(is_active=True)

    

class EventDetailView(generic.DetailView):
    model = Events
    
    
class EventCreateView(LoginRequiredMixin, CreateView):
    model = Events
    fields = ['name', 'img', 'description', 'location', 'date']
    template_name = 'events/event_form.html'

    def form_valid(self, form):
        form.instance.creator = self.request.user
        form.instance.slug = slugify(form.instance.name)
        form.instance.is_active = False  # сразу отправляется на модерацию
        return super().form_valid(form)