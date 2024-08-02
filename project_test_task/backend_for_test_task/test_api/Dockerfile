FROM python:3.12-alpine

WORKDIR /app

# Копируем только файл зависимостей и устанавливаем их
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Копируем остальные файлы проекта
COPY . .

# Порт для приложения
EXPOSE 8000

# Команда по умолчанию для запуска приложения
CMD ["python3", "manage.py", "runserver", "0.0.0.0:8000"]
