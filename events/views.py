from rest_framework import generics, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import Events
from .serializers import EventSerializer
from .services import filter_events_by_title


class EventListAPIView(generics.ListAPIView):
    serializer_class = EventSerializer

    def get_queryset(self):
        query = self.request.GET.get('query')
        return filter_events_by_title(query).filter(is_active=True)


class EventDetailAPIView(generics.RetrieveAPIView):
    queryset = Events.objects.all()
    serializer_class = EventSerializer


class EventCreateAPIView(generics.CreateAPIView):
    queryset = Events.objects.all()
    serializer_class = EventSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(creator=self.request.user, is_active=False)  # Сразу на модерацию


class JoinEventAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, pk):
        event = get_object_or_404(Events, pk=pk)
        if request.user not in event.participants.all():
            event.participants.add(request.user)
            return Response({"detail": "Успешно присоединились к событию."}, status=status.HTTP_200_OK)
        return Response({"detail": "Вы уже участвуете в событии."}, status=status.HTTP_200_OK)
