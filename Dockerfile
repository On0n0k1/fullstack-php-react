# dep will cache dependencies and only update when package.json changes
FROM node:14 as frontend0

# Create a working directory and copy the source code into it
WORKDIR /app

COPY ./front/package.json .

# Install dependencies
RUN npm install

FROM node:14 as frontend1

WORKDIR /app

COPY --from=frontend0 ./app/node_modules ./node_modules
COPY ./front .

# Build the application
RUN npm run build

# Use an official Apache runtime with PHP as a parent image
FROM php:8.0-apache

# Install required system packages
RUN apt-get update && apt-get install -y zip unzip

# Create a volume for logs
VOLUME /var/www/html/logs

# Set the working directory to /var/www/html
WORKDIR /var/www/html

# Copy the contents of the local directory into the container at /var/www/html
COPY ./back /var/www/html

COPY ./.env /var/www/html/api/

# Copy built React files
COPY --from=frontend1 /app/dist /var/www/html

RUN apt-get update && apt-get install -y \
    && docker-php-ext-install mysqli \
    && rm -rf /var/lib/apt/lists/*

# Enable mod_rewrite
RUN a2enmod rewrite

RUN curl -sS https://getcomposer.org/installer | php

RUN mv composer.phar /usr/local/bin/composer

RUN composer install

EXPOSE 80

# Start Apache when the container launches
CMD ["apache2-foreground"]