FROM wordpress:latest
MAINTAINER Philipp Havrilla "philipp.havrilla@bluewin.ch"
RUN apt-get update && \
    DEBIAN_FRONTEND=noninteractive apt-get install -y \
    apt-utils \
    vim \
    gettext \
    nodejs \
    build-essential \
    gnupg
RUN curl -fsSL https://deb.nodesource.com/setup_14.x | bash -
RUN apt-get install -y nodejs
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
ENV PATH=/node_modules/.bin:$PATH
COPY package.json /
RUN (cd / && npm install)
RUN curl -o /usr/local/bin/wp-cli.phar https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar
RUN chmod +x /usr/local/bin/wp-cli.phar
RUN mv /usr/local/bin/wp-cli.phar /usr/local/bin/wp