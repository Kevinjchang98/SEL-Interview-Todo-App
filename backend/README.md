# Running locally

Don't run `deploy.sh` on your, the interviewer's, machine as presumably you don't want my random services sticking
around later. Instead, if you have Docker and Docker Compose ready, run the following to build and start the containers
which will listen on port 4000

```bash
docker-compose build && docker-compose up
```

# Notes

Running `deploy.sh` on a new Debian system should install required dependencies and start the Flask and PostgreSQL
backend. Should be run as sudo, e.g.
```bash
sudo bash ./deploy.sh
```

Currently the Node server is also running on the same Google Cloud VM, though in an actual production deploy we would
have domains, thus SSL certs, and an easier time with https communications between domains/servers in modern browsers.