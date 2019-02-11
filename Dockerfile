FROM php:7.2-fpm

RUN apt-get update && apt-get install -y git openssl curl zip unzip

RUN docker-php-ext-configure pdo_mysql
RUN docker-php-ext-install pdo_mysql

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

WORKDIR /var/www
