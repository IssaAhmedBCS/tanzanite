# Use official lightweight Node.js LTS image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy dependency manifests first for better layer caching
COPY package*.json ./

# Install production dependencies only
RUN npm install --omit=dev

# Copy application source
COPY . .

# Run as non-root user for security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

# Expose the application port
EXPOSE 3000

CMD ["node", "src/app.js"]
