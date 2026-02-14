"""
Management command to create a superuser if one doesn't exist.
This is useful for automated deployments on Render where Shell is not available on free tier.
"""
from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
import os


class Command(BaseCommand):
    help = 'Creates a superuser if none exists (for deployment automation)'

    def handle(self, *args, **options):
        User = get_user_model()

        # Get credentials from environment variables
        username = os.environ.get('ADMIN_USERNAME', 'admin')
        email = os.environ.get('ADMIN_EMAIL', 'admin@example.com')
        password = os.environ.get('ADMIN_PASSWORD')

        if not password:
            self.stdout.write(
                self.style.WARNING(
                    'ADMIN_PASSWORD environment variable not set. '
                    'Skipping superuser creation.'
                )
            )
            return

        # Check if superuser already exists
        if User.objects.filter(username=username).exists():
            self.stdout.write(
                self.style.WARNING(
                    f'Superuser "{username}" already exists. Skipping.'
                )
            )
            return

        # Create superuser
        try:
            User.objects.create_superuser(
                username=username,
                email=email,
                password=password
            )
            self.stdout.write(
                self.style.SUCCESS(
                    f'✓ Superuser "{username}" created successfully!'
                )
            )
            self.stdout.write(
                self.style.SUCCESS(
                    f'  Username: {username}'
                )
            )
            self.stdout.write(
                self.style.SUCCESS(
                    f'  Email: {email}'
                )
            )
        except Exception as e:
            self.stdout.write(
                self.style.ERROR(
                    f'Error creating superuser: {str(e)}'
                )
            )