from django.db import models

# Create your models here.
class Events(models.Model):
    name = models.CharField(max_length=35, verbose_name='название мероприятия')
    img = models.ImageField(upload_to='images', null=True, blank=True, verbose_name='Картинка')
    description = models.TextField(null=True, blank=True, verbose_name='Описание')
    published = models.DateField(auto_now_add=True, db_index=True, verbose_name='Опубликовано')
    status = 
    slug = models.SlugField(unique=True, verbose_name="URL", db_index=True)

    
    
    