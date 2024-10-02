# SEL Interview Todo App

Currently hosted at http://34.168.81.5/

Note that due to DNS propagation delays I wasn't able to get it hosted onto a domain name yet, and thus can't easily get
an SSL cert for https. Google Chrome was the browser primarily used in development, most tested, and recommended to view
this app

Thanks for your time!

## Features/functionalities implemented

1. Viewing tasks in a list
2. Viewing details of a task in a separate page with dynamic per-task route
3. Adding new tasks
4. Editing tasks
5. Marking tasks complete
6. Deleting tasks
7. Undoing deletion of tasks (if user hasn't navigated away from page which is interpreted as confirming permanent
   deletion)
8. Hosted frontend Next.js node server on Debian VM (Google Cloud instance)
9. Backend Flask server running on Debian VM (Google Cloud instance)
10. Backend PostgreSQL database running on Debian VM (Google Cloud instance)
11. Containerized backend in Docker
12. Basic deploy script for Debian VM

## Features to implement

Due to time constraints these features weren't implemented but I would consider them items I would do before deployment
if this were to be an actual production todo app

1. Error handling and actually parsing responses from Flask API
2. Domain name with SSL certs to allow for https access and no hacky CORS rules
3. More detailed unit/integration/regression tests for backend and frontend
4. Optimistic rendering. The design of the frontend with multiple, constant API requests per action instead of the user
   making multiple changes locally, then one API request when they click a confirm button, for example, means laggy
   frontend to backend connections are very apparent
5. More robust DevOps items. Currently the Docker and deploy scripts were made for my own convenience in prototyping,
   but should be made more generalizable for an actual production system
6. Define repo linting, formatting rules for frontend and backend
7. Implement CI/CD pipelines
