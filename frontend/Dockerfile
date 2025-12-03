# ================================
# 1) Build stage
# ================================
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Build for production
RUN npm run build

# ================================
# 2) Runtime stage
# ================================
FROM node:20-alpine AS runner

WORKDIR /app

# Install serve to run the production build
RUN npm install -g serve

# Copy build artifacts from builder
COPY --from=builder /app/dist ./dist

# Expose Cloud Run default port
EXPOSE 8080

# Serve the production build on 8080 (Cloud Run requirement)
CMD ["serve", "-s", "dist", "-l", "8080"]
