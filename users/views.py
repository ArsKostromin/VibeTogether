from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth import login
from django.contrib.auth import get_backends
from .forms import CustomUserCreationForm, CustomUserChangeForm
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from .models import User

# Create your views here.
def registerUser(request):
    page = 'register'
    form = CustomUserCreationForm()

    if request.method == 'POST':
        form = CustomUserCreationForm(request.POST, request.FILES)
        if form.is_valid():
            user = form.save(commit=False)

            user.save()

            messages.success(request, 'Аккаунт успешно создан!')

            user.backend = 'django.contrib.auth.backends.ModelBackend'
            login(request, user)
            
            return redirect('/events/')

        else:
            messages.error(
                request, 'Во время регистрации возникла ошибка')

    context = {'page': page, 'form': form}
    return render(request, 'users/register.html', context)

@login_required
def view_or_edit_profile(request):
    user = request.user

    if request.method == 'POST':
        form = CustomUserChangeForm(request.POST, request.FILES, instance=user)
        if form.is_valid():
            form.save()
            messages.success(request, 'Профиль обновлён.')
            return redirect('profile')  # укажи нужный url name
        else:
            messages.error(request, 'Ошибка при обновлении профиля.')
    else:
        form = CustomUserChangeForm(instance=user)

    return render(request, 'users/profile.html', {'form': form})

@login_required
def user_profile_view(request, user_id):
    profile_user = get_object_or_404(User, id=user_id)
    is_own_profile = request.user == profile_user
    context = {
        'profile_user': profile_user,
        'is_own_profile': is_own_profile,
    }
    return render(request, 'users/user_profile.html', context)