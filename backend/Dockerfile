# # Use Node LTS image
# FROM node:20-alpine

# # Set working directory
# WORKDIR /app

# # Copy package.json and package-lock.json
# COPY package*.json ./

# # Install dependencies
# RUN npm install --production

# # Copy source code
# COPY . .

# # Expose port (backend runs on 5000 for example)
# EXPOSE 5000

# # Start app
# CMD ["node", "src/server.js"]

# Base image
FROM node:20-alpine

# Working directory inside container
WORKDIR /app

# Copy dependency files first (for caching)
COPY package*.json ./

# Install only production dependencies
RUN npm install --production

# Copy rest of the code
COPY . .

# Expose the app port
EXPOSE 3000

# Start the server
CMD ["node", "src/server.js"]

