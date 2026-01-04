# ---------- deps ----------
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --include=dev

# ---------- build ----------
FROM deps AS build
WORKDIR /app
COPY . .
ARG NEXT_PUBLIC_GOOGLE_RECAPTCHA_SITE_KEY
ARG NEXT_PUBLIC_SERVER_URL
ENV NODE_ENV=production
ENV NODE_OPTIONS=--max-old-space-size=1024
ENV NEXT_PUBLIC_GOOGLE_RECAPTCHA_SITE_KEY=$NEXT_PUBLIC_GOOGLE_RECAPTCHA_SITE_KEY
ENV NEXT_PUBLIC_SERVER_URL=$NEXT_PUBLIC_SERVER_URL
RUN npm run build

# ---------- runtime ----------
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY --from=build /app/package.json /app/package-lock.json ./
RUN npm ci --omit=dev

COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY --from=build /app/next.config.js ./next.config.js

EXPOSE 3000
CMD ["npm", "run", "start"]
