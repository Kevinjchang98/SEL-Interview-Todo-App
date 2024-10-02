#!bin/bash

# Install deps
apt-get install -y docker docker-compose nginx

# Set up nginx
rm /etc/nginx/sites-available/default
cp ./nginx-config /etc/nginx/sites-available/default

service nginx restart

# Set up docker containers
docker-compose build

cp ./docker-compose.service /etc/systemd/system/

systemctl enable docker-compose
systemctl start docker-compose