#!bin/bash

apt-get install -y docker docker-compose nginx

rm /etc/nginx/sites-available/default
cp ./nginx-config /etc/nginx/sites-available/default

service nginx restart

# This should be a service and not just running in the current shell
docker-compose build
docker-compose up