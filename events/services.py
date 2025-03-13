from .models import Events


def filter_events_by_title(query):
    '''Фильтрация событий по названию'''
    return Events.objects.filter(name__icontains=query) if query else Events.objects.all()