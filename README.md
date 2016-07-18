# docker-wordpress

WordPress development made easy with [Docker](https://www.docker.com/). This quickstart guide demonstrates how to containerize [WordPress](https://www.wordpress.com/), [Node.js](https://nodejs.org/) and [gulp](http://gulpjs.com/) for local development.

Docker Engine is supported on Linux, Cloud, Windows and OS X. If you haven't used Docker before, be sure to check out the [Installation Guide](https://docs.docker.com/engine/installation/).

## Requirements

* Docker Toolbox 1.11 or higher

## Setup

1. Make sure [Docker Toolbox](https://www.docker.com/products/docker-toolbox) is installed and running.
2. Run the following commands in the given order:

```bash
ssh -T git@github.com
# Test the connection
git clone git@github.com:philipp-x/docker-wordpress.git
# Clone the repository
cd docker-wordpress
# Change the directory
docker-compose up -d
# Start the containers in the background
```

At this point, your WordPress website should be running at port `8000` on your Docker host. If you are using a Docker Machine VM, you can use the `docker-machine ip MACHINE_NAME` to get the IP address.

Type `docker-compose stop` to stop running containers without removing them.

## Upgrade

1. Stop all running containers.
2. Run `git pull` in your working directory to fetch and merge remote changes.
3. Execute `docker-compose build --pull` to rebuild the service images.

## Getting started

### Theme Development

1. Make sure no container is running.
2. Open `docker-compose.yml` and uncomment line 17 and 18.
3. Type `docker-compose run --rm web bash` to run an interactive shell in the image.
4. Install app dependencies with `npm install --prefix wp-content/themes/mytheme --save-dev`.
5. Log in to the WordPress Admin Panels and select the `Appearance` panel, then `Themes`.
6. To activate the Theme click the `Activate` button.

### I18n

1. Run `./makepot.sh` to generate a `.pot` file for your theme.
2. Translate the `msgstr` sections to the desired language. The result is a `.po` file named `locale`.po (e.g., en_GB.po).
3. Make sure to replace `CHARSET` with `UTF-8`.
4. Run `./potomo.sh` to compile the `.po` files.

For more information, please visit [I18n for WordPress Developers](https://codex.wordpress.org/I18n_for_WordPress_Developers).

## Command Reference

### Docker

* Cleanup

```bash
docker stop $(docker ps -a -q)
# Stop all running containers
docker kill $(docker ps -q)
# Kill all running containers
docker rm $(docker ps -a -q)
# Delete all stopped containers
docker rmi $(docker images -q -f dangling=true)
# Delete all dangling images
docker rmi $(docker images -q)
# Delete all images
docker volume rm $(docker volume ls -q -f dangling=true)
# Delete all dangling volumes
```

### gulp

* Minify files

```bash
docker-compose run --rm web gulp watch
# Watch file changes
docker-compose run --rm web gulp minify-css
# Minify CSS files
docker-compose run --rm web gulp sass
# Compile Sass files
docker-compose run --rm web gulp compress
# Minify JavaScript files
```