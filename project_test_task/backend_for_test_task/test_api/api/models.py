from django.db import models


class Note(models.Model):
    class Meta:
        verbose_name = 'Заметка'
        verbose_name_plural = 'Заметки'

    title = models.CharField(max_length=255, verbose_name="Заголовок заметки")
    body = models.TextField(verbose_name="Текст заметки")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Дата создания")

    def __str__(self):
        return self.title
