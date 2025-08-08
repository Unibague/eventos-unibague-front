# Etapa de build
FROM node:18-alpine AS builder

WORKDIR /app

# Instala dependencias
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Copia el resto de la app y construye
COPY . .
RUN npm run build

# Etapa final de producción
FROM node:18-alpine

WORKDIR /app

# Copia archivos necesarios de la etapa de build
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/app ./app

# Solo dependencias de producción
RUN npm install --production --legacy-peer-deps

EXPOSE 3100
CMD ["npm", "start"]
