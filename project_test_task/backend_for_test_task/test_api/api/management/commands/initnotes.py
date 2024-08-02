import json, os

from django.core.management.base import BaseCommand
from django.conf import settings


class Command(BaseCommand):
    help = 'Создает тестовые заметки'

    def handle(self, *args, **options):
        from api.models import Note
        with open(os.path.join(settings.BASE_DIR, 'test_data.json'), 'r') as f:
            data = json.load(f)
        Note.objects.bulk_create([Note(**item) for item in data])
        self.stdout.write(self.style.SUCCESS('Заметки добавлен в базу.'))
