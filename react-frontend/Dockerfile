# Use the official Node.js image as the base image
FROM node:18.14

# Install dependencies
RUN apt-get update && apt-get install -y \
    nginx \
    supervisor

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install npm dependencies
RUN npm install

# Copy the project files to the container
COPY . .

# Copy Nginx configuration
COPY .docker/nginx.conf /etc/nginx/sites-available/default

# Copy Supervisor configuration
COPY .docker/supervisord.conf /etc/supervisor/conf.d/supervisord.conf

# Build the React app
RUN npm run build

# Set appropriate ownership and permissions for the build output
RUN chown -R www-data:www-data \
    /usr/src/app/dist
RUN chmod -R 777 \
    /usr/src/app/dist

# Start the React app using Supervisor
CMD ["/usr/bin/supervisord"]
