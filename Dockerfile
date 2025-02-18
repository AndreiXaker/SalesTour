# Шаг 1: Используем официальный образ Node.js для сборки приложения
FROM node:18-alpine AS build

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

RUN npm config set registry https://registry.npmjs.org/

RUN npm config set strict-ssl false


# Устанавливаем зависимости
RUN npm install --legacy-peer-deps

# Копируем весь проект в контейнер
COPY . .

# Сборка приложения с экспортом статического контента
RUN npm run build

# Шаг 2: Используем официальный образ Nginx для раздачи статики
FROM nginx:alpine


COPY --from=build /app/dist /usr/share/nginx/html


# Копируем конфигурационный файл nginx
COPY --from=build /app/nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Экспонируем порты для HTTP и HTTPS
EXPOSE 80
EXPOSE 443

# Запускаем Nginx для обслуживания статических файлов
CMD ["nginx", "-g", "daemon off;"]
