# ================================
# 1) Build stage
# ================================
FROM node:20-alpine AS builder

# Create app directory
WORKDIR /app

# Install dependencies first (better layer caching)
COPY ./hms-backend/package*.json ./
COPY ./hms-backend/tsconfig.json ./
COPY ./hms-backend/prisma ./prisma

RUN npm install

# Provide DATABASE_URL so prisma generate can run in build
ARG DATABASE_URL="mysql://root:password@localhost:3306/hms_db"
ENV DATABASE_URL=${DATABASE_URL}

# Generate Prisma Client
RUN npx prisma generate

# Copy source code
COPY ./hms-backend/src ./src

# Build TypeScript -> JavaScript (dist/)
RUN npm run build

# ================================
# 2) Runtime stage
# ================================
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=8080

# Only copy what we need for runtime
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

# Expose app port
EXPOSE 8080

# Start the server
CMD ["node", "dist/server.js"]
