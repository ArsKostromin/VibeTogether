from django.contrib import admin
from .models import Events

# Register your models here.

class EventsAdmin(admin.ModelAdmin):
    list_display = ('name', 'description', 'published', 'location', 'img')
    list_display_links = ('name', 'description')
    search_fields = ('name', 'description')
    prepopulated_fields = {"slug": ("name", )}
    
admin.site.register(Events, EventsAdmin)