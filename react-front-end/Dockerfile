
# ---- Stage 1: Build React App ----
FROM node:18-alpine AS build

# Set working directory
WORKDIR /app

# Copy source files
COPY . .

# Install dependencies and build app
RUN npm install && npm run build

# ---- Stage 2: Serve with Nginx ----
FROM nginx:alpine

# Remove default nginx static files
RUN rm -rf /usr/share/nginx/html/*

# Copy built app from previous stage
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]

