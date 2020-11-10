from django.core.management.base import BaseCommand, CommandError
from api.models import Course
from api.models_choices import COURSES_CHOICES

class Command(BaseCommand):
    def handle(self, *args, **options):
        for course in COURSES_CHOICES:
            object, created = Course.objects.get_or_create(name=course[0])
            if created:
                self.stdout.write(
                    self.style.SUCCESS(f'{object.name} created')
                )
            else:
                self.stdout.write(
                    self.style.WARNING(f'{object.name} already exists.')
                )
