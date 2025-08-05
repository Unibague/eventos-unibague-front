# ----------------------
# Etapa 1: Build
# ----------------------
FROM node:18-alpine AS builder

# Establece el directorio de trabajo
WORKDIR /app

# Copia package.json y package-lock.json
COPY package*.json ./

# Instala dependencias ignorando conflictos de peer
RUN npm install --legacy-peer-deps

# Copia el resto de los archivos
COPY . .

# Compila el proyecto Next.js
RUN npm run build


# ----------------------
# Etapa 2: Producción
# ----------------------
FROM node:18-alpine AS production

WORKDIR /app

# Copia dependencias e instalación desde builder
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules

# Copia el resto del proyecto compilado
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/next.config.js ./next.config.js
COPY --from=builder /app/tsconfig.json ./tsconfig.json
COPY --from=builder /app/app ./app

# Exponer el puerto
EXPOSE 3100

# Iniciar el servidor de Next.js en producción
CMD ["npm", "run", "start"]
