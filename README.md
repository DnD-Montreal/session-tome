<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400"></a></p>

<p align="center">
<a href="https://github.com/DnD-Montreal/session-tome/actions"><img src="https://github.com/DnD-Montreal/session-tome/actions/workflows/test-suite.yml/badge.svg?" alt="Build Status"></a>
<a href="https://codeclimate.com/github/DnD-Montreal/session-tome/maintainability"><img src="https://api.codeclimate.com/v1/badges/17607964d06fb417aa4a/maintainability" /></a>
<a href="https://codeclimate.com/github/DnD-Montreal/session-tome/test_coverage"><img src="https://api.codeclimate.com/v1/badges/17607964d06fb417aa4a/test_coverage" /></a>
<a href="https://github.com/DnD-Montreal/session-tome"><img src="https://img.shields.io/badge/License-MIT-green" alt="License"></a>
</p>

# SessionTome
A web application for managing Dungeons and Dragons Adventurer's League Characters. Featuring player rating and magic item trading systems!

This Project is built as a React front end SPA and communicates with Laravel via InertiaJS.

Session Tome was built for and in collaboration with [DnD MTL](dndmtl.com).

## Purpose
This Project was created in part to satisfy the requirements of SOEN 490: Capstone Software Engineering Design Project @
Concordia University.

## Installation
For more in-depth development environment set-up & application installation instructions, see the [Wiki entry about Development Environments](https://github.com/DnD-Montreal/session-tome/wiki/Development-Environment).

### Quick Start
To run this project locally, all you truly need is Docker. Though to develop locally, it's helpful to install PHP8.0, Composer, and Node14 + Yarn.

#### Without Local Dependencies Installed
If you are not running this application to develop locally, then you can simply leverage the docker containers and docker compose to run the required commands.

```shell
cp .env.example .env
# Before proceeding make sure to set APP_ENV=production in the .env to automate running migrations
# use Docker to run the required set-up commands
docker compose run --rm --no-deps php bash -ci "composer install && php artisan key:generate"
docker compose run --rm --no-deps node bash -ci 'yarn install && yarn run prod'
```

#### With Local Dependencies Installed
If you have all the required dependencies installed, then you can rely much less on running docker containers and instead run the commands directly on your host machine.

```shell
cp .env.example .env
composer install
php artisan key:generate
yarn install
yarn dev
```


## Usage

### Docker Compose
Once all the dependencies have been installed and set-up is complete, from the project root simply run:

```shell
docker network create web-public
docker compose up -d
# If you're running the site with local dependencies you'll need to migrate your database with
php artisan migrate
```

At which point, docker will begin to download all the required images if they're missing and initialize them. The first time this will take a few moments; though subsequent runs should be much quicker.

Once complete, the site should be available at http://localhost!

## Contributing
If you're interested in contributing to Session Tome, see our [Contributing](https://github.com/DnD-Montreal/session-tome/blob/main/CONTRIBUTING.md) guidelines.

## Credit

This project was designed and created by "Wizards of the Code" consisting of:
- Annie Tran
- Beatrice Cobo
- Ian Phillips
- Jason Gadoury
- Luigi Besani Urena
- Massimo Triassi
- Pascal Dermerdjian
- Robert Nittolo
- Wei Chen (Wilson) Huang

_note: Wizards of the Code is in no way affiliated with Wizards of the Coast. Any similarities are purely coincidental._

## License

Session Tome is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).

## Security Vulnerabilities

If you discover a security vulnerability within Session Tome, please send an e-mail to Massimo Triassi via [massimo@dndmtl.com](mailto:massimo@dndmtl.com). All security vulnerabilities will be promptly addressed.

## License

The Laravel framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
