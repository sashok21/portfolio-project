from django.shortcuts import render
from .models import OwnerProfile, Experience, Service, Skill


def home_view(request):
    """
    Main portfolio page view with all content sections
    """
    # Get profile data
    profile = OwnerProfile.objects.first()

    # Get experience ordered by order field
    experience = Experience.objects.all().order_by('order')

    # Get all services
    services = Service.objects.all()

    # Get all skills
    skills = Skill.objects.all()

    context = {
        'profile': profile,
        'experience': experience,
        'services': services,
        'skills': skills,
    }

    return render(request, 'portfolio/home.html', context)