# Etapa 1: Build de la app
FROM node:18-alpine as builder

WORKDIR /app

# Usa yarn y copia el lockfile correcto
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .
RUN yarn build

# Etapa 2: Producción
FROM node:18-alpine

WORKDIR /app

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/package.json ./
COPY --from=builder /app/yarn.lock ./
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/app ./app

RUN yarn install --production --frozen-lockfile

EXPOSE 3100
CMD ["yarn", "start"]
