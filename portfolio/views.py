from django.shortcuts import render
from .models import OwnerProfile, Experience, Service, Skill, SocialLink


def home_view(request):
    """
    Main portfolio page view
    """
    profile = OwnerProfile.objects.first()

    if not profile:
        profile = OwnerProfile(
            name="Ім'я Прізвище",
            role="Розробник / Дизайнер",
            about_text="Це стандартний текст. Зайдіть в адмін панель, щоб заповнити профіль."
        )

    # Отримуємо решту даних
    experience = Experience.objects.all().order_by('order')
    services = Service.objects.all()
    skills = Skill.objects.all()
    social_links = SocialLink.objects.all().order_by('order')

    context = {
        'profile': profile,
        'experience': experience,
        'services': services,
        'skills': skills,
        'social_links': social_links,
    }

    return render(request, 'portfolio/home.html', context)