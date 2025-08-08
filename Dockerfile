# Etapa 1: build de la app
FROM node:18-alpine as builder

WORKDIR /app

COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . .
RUN npm run build

# Etapa 2: contenedor de producción
FROM node:18-alpine

WORKDIR /app

# Copiar solo lo necesario desde el builder
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/app ./app

# Instalar solo dependencias de producción
RUN npm install --production --legacy-peer-deps

EXPOSE 3100
CMD ["npm", "start"]
