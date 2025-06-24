from rest_framework import serializers
from .models import Events

class EventSerializer(serializers.ModelSerializer):
    creator = serializers.ReadOnlyField(source='creator.username')
    participants = serializers.StringRelatedField(many=True, read_only=True)
    img = serializers.SerializerMethodField()

    class Meta:
        model = Events
        fields = ['id', 'name', 'img', 'description', 'location', 'date', 'is_active', 'creator', 'participants']

    def get_img(self, obj):
        request = self.context.get('request', None)
        if obj.img and hasattr(obj.img, 'url'):
            if request:
                return request.build_absolute_uri(obj.img.url)
            return obj.img.url
        return None
