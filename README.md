# docker-wordpress

WordPress development made easy with [Docker](https://www.docker.com/). This quickstart guide demonstrates how to containerize [WordPress](https://www.wordpress.com/), [Node.js](https://nodejs.org/) and [gulp](http://gulpjs.com/) for local development using the [Underscores](https://underscores.me/) starter theme.

Docker Engine is supported on Linux, Cloud, Windows and macOS. If you haven't used Docker before, be sure to check out the [Installation Guide](https://docs.docker.com/engine/installation/).

## Requirements

* Docker v17.06 or higher

## Setup

1. Make sure [Docker](https://store.docker.com/) is installed and running.
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

3. Use `http://localhost:8000` to open WordPress in a web browser
4. Complete the famous five-minute installation as a WordPress administrator
5. Run the following commands in the given order:

```bash
wp scaffold _s mytheme --theme_name="My Theme" --author="Philipp Havrilla" --author_uri="http://underscores.me/" --sassify --allow-root
# Using WP-CLI to create an _s-based theme
```

6. To activate the theme log in to the WordPress Admin and go to `Appearance`, then `Themes` and click the `Activate` button

The command `docker-compose down` removes the containers and default network, but preserves your WordPress database.

For more information, please visit [Compose and WordPress](https://docs.docker.com/compose/wordpress/).

### Rename

If you want to change the theme name to something else find and replace `mytheme` at these locations:

* Theme folder located under `wp-content` and `themes`
* `Dockerfile` line 25
* `docker-compose.yml` line 9
* `wp scaffold _s` slug

## Upgrade

1. Stop all running containers
2. Run `git pull` in your working directory to fetch and merge remote changes
3. Execute `docker-compose build --pull` to rebuild the service images

## Getting started

### I18n

1. Run `./makepot.sh` to generate a `.pot` file for your theme
2. Translate the `msgstr` sections to the desired language. The result is a `.po` file named `locale`.po (e.g., en_GB.po)
3. Make sure to replace `CHARSET` with `UTF-8`
4. Run `./potomo.sh` to compile the `.po` files

For more information, please visit [I18n for WordPress Developers](https://codex.wordpress.org/I18n_for_WordPress_Developers).

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
docker-compose run --rm web gulp sprite:optimise
# Optimise SVG files
```

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
docker volume ls
# List all volumes
docker volume prune
# Remove all volumes not used by at least one container
```