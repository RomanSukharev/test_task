from django.core.management.base import BaseCommand


class Command(BaseCommand):
    help = 'Создает тестового пользователя'

    def handle(self, *args, **options):
        from django.contrib.auth.models import User
        User.objects.create_user(username='webmaster', password='webmaster', email='admin@admin.com')
        self.stdout.write(self.style.SUCCESS('Создан пользователь webmaster/webmaster'))
