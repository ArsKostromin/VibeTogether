from django.contrib.auth import views as auth_views
from django.urls import path, include
from .views import registerUser, view_or_edit_profile, user_profile_view

urlpatterns = [
    path('login/', auth_views.LoginView.as_view(template_name='users/login.html'), name='login'),
    path('logout/', auth_views.LogoutView.as_view(), name='logout'),
    path('register/', registerUser, name='register'),
    path('profile/', view_or_edit_profile, name='profile'),
    path('profile/<int:user_id>/', user_profile_view, name='user_profile'),
]
