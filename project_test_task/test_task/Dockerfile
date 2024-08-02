FROM node:18-alpine

WORKDIR /app

# Удаление старых node_modules и package-lock.json
RUN rm -rf node_modules package-lock.json

COPY package*.json ./

# Установка зависимостей
RUN npm install

# Установка nuxt глобально
RUN npm install -g nuxt

COPY . .

EXPOSE 3000

# Команда для запуска приложения
CMD ["npm", "run", "dev"]
