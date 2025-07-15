# Usamos una imagen con Node
FROM node:18-alpine

# Establecer directorio de trabajo
WORKDIR /app

# Copiar dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código
COPY . .

# Construir la app (solo si quieres producción)
RUN npm run build

# Exponer el puerto de Next.js
EXPOSE 3000

# Ejecutar la app
CMD ["npm", "run", "start"]
