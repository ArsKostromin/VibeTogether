from django.db import models
from django.urls import reverse
from django.contrib.auth import get_user_model

User = get_user_model()

class Events(models.Model):
    name = models.CharField(max_length=35, verbose_name='название мероприятия')
    img = models.ImageField(upload_to='images', null=True, blank=True, verbose_name='Картинка')
    description = models.TextField(null=True, blank=True, verbose_name='Описание')
    location = models.CharField(max_length=35, null=True, blank=True, verbose_name='место проведения')
    published = models.DateField(auto_now_add=True, db_index=True, verbose_name='Опубликовано')
    vote = models.IntegerField(default=0, null=True, blank=True, verbose_name='голоса')
    date = models.DateField(null=True, blank=True, verbose_name='дата проведения')
    slug = models.SlugField(unique=True, verbose_name="URL", db_index=True)

    creator = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='created_events',
        verbose_name='Создатель',
        blank=True,
        null=True,
    )

    participants = models.ManyToManyField(
        User,
        related_name='joined_events',
        blank=True,
        null=True,
        verbose_name='Участники',
    )

    is_active = models.BooleanField(default=False, verbose_name='Опубликовано модератором')

    class Meta:
        verbose_name_plural = 'Мероприятия'
        verbose_name = 'мероприятие'
        ordering = ['-published']

    def get_absolute_url(self):
        return reverse('event_detail', args={self.slug})

    def __str__(self):
        return self.name
