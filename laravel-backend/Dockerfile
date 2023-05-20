# Use the official PHP image as the base image
FROM php:8.2.3-fpm

# Install dependencies
RUN apt-get update && apt-get install -y \
    libzip-dev \
    zip \
    nginx \
    supervisor \
    cron \
    mariadb-client \ 
    && docker-php-ext-install zip pdo_mysql

# Set the working directory
WORKDIR /var/www/html

# Copy the project files to the container
COPY . .

# Copy Nginx configuration
COPY .docker/nginx.conf /etc/nginx/sites-available/default

# Copy Supervisor configuration
COPY .docker/supervisord.conf /etc/supervisor/conf.d/supervisord.conf

# Copy startup script
COPY ./.docker/startup.sh /bin/startup.sh

# Copy cron job file
COPY ./.docker/crontab /etc/cron.d/crontab

# Apply cron job
RUN crontab /etc/cron.d/crontab

# Create the log file to be able to run tail
RUN touch /var/log/cron.log

# Give execution rights on the cron job
RUN chmod 0644 /etc/cron.d/crontab

# Set appropriate ownership and permissions for Laravel directories
RUN chown -R www-data:www-data \
    /var/www/html/storage \
    /var/www/html/bootstrap/cache
RUN chmod -R 777 \
    /var/www/html/storage \
    /var/www/html/bootstrap/cache

# Make the startup script executable
RUN chmod +x /bin/startup.sh

# Install Composer dependencies
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
RUN composer install

# Start the PHP-FPM server, Supervisor, cron, and tail the cron log file
CMD ["bash", "-c", "/bin/startup.sh && /usr/bin/supervisord && cron && tail -f /var/log/cron.log"]
