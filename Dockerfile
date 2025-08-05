# ----------------------
# Etapa 1: Build
# ----------------------
FROM node:18-alpine AS builder

ENV NEXT_TELEMETRY_DISABLED=1

WORKDIR /app

# Copia package.json e instala dependencias
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Copia el resto del código
COPY . .

# Ejecuta la build de Next.js
RUN npm run build


# ----------------------
# Etapa 2: Producción
# ----------------------
FROM node:18-alpine AS production

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

WORKDIR /app

# Copia solo las partes necesarias
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.js ./next.config.js
COPY --from=builder /app/tsconfig.json ./tsconfig.json
COPY --from=builder /app/app ./app

# Si usas otros archivos (quasar.config.js, tailwind.config.js, .env), agrégalos también:
# COPY --from=builder /app/.env ./.env

EXPOSE 3100

CMD ["npm", "run", "start"]
