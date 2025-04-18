from django.db import models
from django.urls import reverse

# Create your models here.
class Events(models.Model):
    name = models.CharField(max_length=35, verbose_name='название мероприятия')
    img = models.ImageField(upload_to='images', null=True, blank=True, verbose_name='Картинка')
    description = models.TextField(null=True, blank=True, verbose_name='Описание')
    location = models.CharField(max_length=35, null=True, blank=True, verbose_name='место проведения')
    published = models.DateField(auto_now_add=True, db_index=True, verbose_name='Опубликовано')
    vote = models.IntegerField(default=0, null=True, blank=True, verbose_name='голоса')
    date = models.DateField(null=True, blank=True, verbose_name='дата проведения')
    slug = models.SlugField(unique=True, verbose_name="URL", db_index=True)

    class Meta:
        verbose_name_plural = 'Мероприятия'
        verbose_name = 'мероприятие'
        ordering = ['-published']
    
    def get_absolute_url(self):
        """
        Возвращает URL-адрес для доступа к определенному экземпляру книги.
        """
        return reverse('event_detail', args={ self.slug })
    
    def __str__(self):
        """
        Строка для представления модельного объекта.
        """
        return self.name