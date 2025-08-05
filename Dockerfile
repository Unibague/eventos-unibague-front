# ----------------------
# Etapa 1: Build
# ----------------------
FROM node:18-alpine AS builder

ENV NEXT_TELEMETRY_DISABLED=1

WORKDIR /app

COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . .
RUN npm run build


# ----------------------
# Etapa 2: Producción
# ----------------------
FROM node:18-alpine

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

WORKDIR /app

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.js ./next.config.js
COPY --from=builder /app/tsconfig.json ./tsconfig.json
COPY --from=builder /app/app ./app

EXPOSE 3100
CMD ["npm", "run", "start"]
