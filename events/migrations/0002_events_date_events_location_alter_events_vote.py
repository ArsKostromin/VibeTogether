# Generated by Django 5.1.7 on 2025-03-11 16:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('events', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='events',
            name='date',
            field=models.DateField(blank=True, null=True, verbose_name='дата проведения'),
        ),
        migrations.AddField(
            model_name='events',
            name='location',
            field=models.CharField(blank=True, max_length=35, null=True, verbose_name='место проведения'),
        ),
        migrations.AlterField(
            model_name='events',
            name='vote',
            field=models.IntegerField(blank=True, default=0, null=True, verbose_name='голоса'),
        ),
    ]
