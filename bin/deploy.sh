#!/usr/bin/env bash

ssh ubuntu@51.77.119.205 -T <<EOF
	cd /var/www/phillipcraig.com

	printf "Pulling from master...\n"
	git stash
	git pull
	git stash clear

	printf "Installing dependencies...\n"
	composer install
	composer dump-autoload
	npm install

	printf "Building assets...\n"
	npm run build

	printf "Clearing cache...\n"
	php artisan cache:clear
	php artisan config:clear
	php artisan queue:restart
	exit
EOF
