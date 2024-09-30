#!bin/bash

apt-get install docker docker-compose nginx

rm /etc/nginx/sites-available/default
cp ./nginx-config /etc/nginx/sites-available/default

service nginx restart