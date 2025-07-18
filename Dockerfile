FROM node:18-alpine

# Establece el directorio de trabajo
WORKDIR /app

# Copia solo los archivos necesarios para instalar dependencias
COPY package*.json ./

# Instala dependencias ignorando conflictos de dependencias peer
RUN npm install --legacy-peer-deps

# Copia el resto de los archivos del proyecto
COPY . .

# Expone el puerto usado por Next.js
EXPOSE 3100

# Comando por defecto para ejecutar la app
CMD ["npm", "run", "start"]
