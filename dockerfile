# Используем официальный образ Python
FROM python:3.11-slim

# Устанавливаем рабочую директорию
WORKDIR /app

# Устанавливаем системные зависимости
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    libpq-dev \
 && apt-get clean \
 && rm -rf /var/lib/apt/lists/*

# Обновляем pip и устанавливаем wheel
RUN pip install --upgrade pip setuptools wheel

# Копируем зависимости и устанавливаем их
COPY .env .env
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Копируем весь проект
COPY . .

# (опционально) укажи команду запуска
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
