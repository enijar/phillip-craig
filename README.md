# Phillip Craig

Fashion website with stock sales.

### Running

Setup default ENV variables, run:

```bash
cp .env.example .env
```

Install PHP dependencies, run:

```bash
composer install
```

Generate app key, run:

```bash
php artisan key:generate
```

Generate JWT secret key, run:

```bash
php artisan jwt:secret
```

If you are using [Docker](https://www.docker.com/get-started), run:

```bash
docker-compose up
```

### Database

Setup database tables and default data.

By default the ENV variables will be setup to use the MySQL service
inside the Docker container.

To seed the database, run:

```bash
docker-compose exec app php artisan migrate:fresh --seed
```

If you are using a MySQL database outside of the Docker container, run:

```bash
php artisan migrate:fresh --seed
```

### Adding Packages

To install additional PHP/Node.JS dependencies you will need to execute
these inside the Docker container.

Install PHP dependencies inside the Docker container

```bash
docker-compose exec app composer require `package_name`
```

Install Node.JS dependencies inside the Docker container

```bash
docker-compose exec node npm add `package_name`
```

### Deploying to Staging/Production

Follow the steps outlined in the [Running](#Running) section (the Docker
step is optional). Then run:

```bash
npm run build
```

Make sure www-data owns the correct directories, run:

```bash
chown www-data:www-data -R storage bootstrap public
```

### Links

[Staging](https://staging.phillipcraig.com)

[Production](https://phillipcraig.com)

### Deploying

Assuming you have deployment privileges, run:

```bash
./bin/deploy.sh
```
