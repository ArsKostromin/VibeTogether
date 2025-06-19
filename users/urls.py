# users/urls.py
from django.urls import path
from .views import RegisterUserAPIView, MyProfileAPIView, UserProfileAPIView, CustomAuthToken

urlpatterns = [
    path('register/', RegisterUserAPIView.as_view(), name='api_register'),
    path('login/', CustomAuthToken.as_view(), name='api_login'),
    path('me/', MyProfileAPIView.as_view(), name='api_profile'),
    path('<int:user_id>/', UserProfileAPIView.as_view(), name='api_user_profile'),
]