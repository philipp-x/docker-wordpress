FROM wordpress:latest
MAINTAINER Philipp Havrilla "philipp.havrilla@bluewin.ch"
RUN curl -sL https://deb.nodesource.com/setup | bash -
RUN apt-get update && \
    DEBIAN_FRONTEND=noninteractive apt-get install -y \
    apt-utils \
    vim \
    gettext \
    nodejs
RUN npm -g install npm@latest
RUN npm install --global gulp-cli
RUN echo 'opcache.enable=0' >> /usr/local/etc/php/conf.d/opcache-recommended.ini
RUN echo 'file_uploads = On\n'\
'memory_limit = 64M\n'\
'upload_max_filesize = 64M\n'\
'post_max_size = 64M\n'\
'max_execution_time = 600'\
> /usr/local/etc/php/conf.d/uploads.ini
RUN docker-php-ext-install gettext
WORKDIR /var/www/html/