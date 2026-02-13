from django.contrib import admin
from django.contrib.auth.models import Group
from unfold.admin import ModelAdmin
from .models import OwnerProfile, Experience, Service, Skill, SocialLink

admin.site.unregister(Group)

@admin.register(OwnerProfile)
class ProfileAdmin(ModelAdmin):
    def has_add_permission(self, request):
        return not OwnerProfile.objects.exists()

@admin.register(SocialLink)
class SocialLinkAdmin(ModelAdmin):
    list_display = ('name', 'link', 'order')
    list_editable = ('order',)

@admin.register(Experience)
class ExperienceAdmin(ModelAdmin):
    list_display = ('company', 'position', 'period', 'order')
    list_editable = ('order',)

@admin.register(Service)
class ServiceAdmin(ModelAdmin):
    list_display = ('title',)

@admin.register(Skill)
class SkillAdmin(ModelAdmin):
    list_display = ('name',)