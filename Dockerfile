# Image Size: 221MB
# Linux + Node + Source + Project dependencies
FROM node:16-alpine as base
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install 
# RUN npm install react-qr-reader --save --legacy-peer-deps
COPY . .

# Linux + Node + Source + Project dependencies + build assets
FROM base AS build
ENV NODE_ENV=production
WORKDIR /build
COPY --from=base /app ./
RUN rm -r node_modules/@next/swc-linux-x64-gnu
RUN npm run build

# We keep some artifacts from build
FROM node:16-alpine AS production
ENV NODE_ENV=production
WORKDIR /app
COPY --from=build /build/package*.json ./
COPY --from=build /build/.next ./.next
COPY --from=build /build/public ./public
RUN npm install next

EXPOSE 3000
CMD ["npm", "run", "start"]

# # Install dependencies only when needed
# FROM node:16-alpine AS deps
# # Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
# RUN apk add --no-cache libc6-compat
# WORKDIR /app
# COPY package.json ./
# RUN npm install --frozen-lockfile --save --legacy-peer-deps

# # Rebuild the source code only when needed
# FROM node:16-alpine AS builder
# WORKDIR /app
# COPY . .
# COPY --from=deps /app/node_modules ./node_modules
# RUN cat package.json
# RUN rm -r node_modules/@next/swc-linux-x64-gnu
# RUN npm run build && npm install --production --ignore-scripts --prefer-offline 

# # Production image, copy all the files and run next
# FROM node:16-alpine AS runner
# WORKDIR /app

# ENV NODE_ENV production

# RUN addgroup -g 1001 -S nodejs
# RUN adduser -S nextjs -u 1001

# # You only need to copy next.config.js if you are NOT using the default configuration
# # COPY --from=builder /app/next.config.js ./
# COPY --from=builder /app/public ./public
# COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
# COPY --from=builder /app/node_modules ./node_modules
# COPY --from=builder /app/package.json ./package.json

# USER nextjs

# EXPOSE 3000

# ENV PORT 3000

# # Next.js collects completely anonymous telemetry data about general usage.
# # Learn more here: https://nextjs.org/telemetry
# # Uncomment the following line in case you want to disable telemetry.
# # ENV NEXT_TELEMETRY_DISABLED 1

# CMD ["node_modules/.bin/next", "start"]
