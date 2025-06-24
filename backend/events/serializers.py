from rest_framework import serializers
from .models import Events

class EventSerializer(serializers.ModelSerializer):
    creator = serializers.ReadOnlyField(source='creator.username')
    participants = serializers.StringRelatedField(many=True, read_only=True)

    class Meta:
        model = Events
        fields = ['id', 'name', 'img', 'description', 'location', 'date', 'is_active', 'creator', 'participants']
