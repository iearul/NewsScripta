# Use the official PHP image as the base image
FROM php:8.2.3-fpm

# Install dependencies
RUN apt-get update && apt-get install -y \
    libzip-dev \
    zip \
    nginx \
    supervisor \
    && docker-php-ext-install zip pdo_mysql

# Set the working directory
WORKDIR /var/www/html

# Copy the project files to the container
COPY . .
COPY .docker/nginx.conf /etc/nginx/sites-available/default
COPY .docker/supervisord.conf /etc/supervisor/conf.d/supervisord.conf
# Install composer dependencies
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
RUN composer install

RUN chown -R www-data:www-data \
    /var/www/html/storage \
    /var/www/html/bootstrap/cache
RUN chmod -R 777 \
    /var/www/html/storage \
    /var/www/html/bootstrap/cache


# Start the PHP-FPM server
CMD ["/usr/bin/supervisord"]
