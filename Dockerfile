FROM wordpress:latest
MAINTAINER Philipp Havrilla "philipp.havrilla@bluewin.ch"
RUN curl -sL https://deb.nodesource.com/setup | bash -
RUN apt-get update && \
    DEBIAN_FRONTEND=noninteractive apt-get install -y \
    apt-utils \
    nodejs
RUN npm -g install npm@latest
RUN npm install --global gulp-cli
WORKDIR /var/www/html/