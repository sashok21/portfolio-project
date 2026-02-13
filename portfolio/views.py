from django.shortcuts import render
from .models import OwnerProfile, Experience, Service, Skill


def home_view(request):
    profile = OwnerProfile.objects.first()
    experience = Experience.objects.all()
    services = Service.objects.all()
    skills = Skill.objects.all()

    context = {
        'profile': profile,
        'experience': experience,
        'services': services,
        'skills': skills,
    }
    return render(request, 'home.html', context)