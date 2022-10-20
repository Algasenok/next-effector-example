FROM node:16.15.0-alpine AS builder
WORKDIR /app
RUN apk add --no-cache libc6-compat
COPY . .
RUN yarn install --frozen-lockfile
RUN yarn build && yarn install --production --ignore-scripts --prefer-offline
RUN ls -la

FROM node:16.15.0-alpine AS runner
WORKDIR /app
ENV NODE_ENV production
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
# USER nextjs
EXPOSE 80
ENV PORT 80
ENV NEXT_TELEMETRY_DISABLED 1
CMD ["node_modules/.bin/next", "start"]
