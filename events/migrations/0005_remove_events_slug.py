# Generated by Django 5.2.1 on 2025-06-01 17:48

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('events', '0004_events_is_active'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='events',
            name='slug',
        ),
    ]
