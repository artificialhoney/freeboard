# Use the node image from official Docker Hub
FROM node:20.18.1-alpine AS build-stage
# set the working directory
WORKDIR /app
# Copy the working directory in the container
COPY package*.json ./
# Install the project dependencies
RUN npm install && npm install @rollup/rollup-linux-arm64-musl @esbuild/linux-arm64
# Copy the rest of the project files to the container
COPY . .
COPY packages/ui .
# Build the Vue.js application to the production mode to dist folder
RUN npm run build
# Use the lightweight Nginx image from the previous stage for the nginx container
FROM nginx:stable-alpine AS production-stage
# Copy the build application from the previous stage to the Nginx container
COPY --from=build-stage /app/dist /usr/share/nginx/html/
# Copy the nginx configuration file
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
# Expose the port 80
EXPOSE 80
# Start Nginx to serve the application
CMD ["nginx", "-g", "daemon off;"]
