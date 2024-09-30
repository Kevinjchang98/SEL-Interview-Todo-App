# SEL Interview Todo App

## Features/functionalities implemented

1. Viewing tasks in a list
2. Viewing details of a task in a separate page with dynamic per-task route
2. Adding new tasks
2. Editing tasks
3. Marking tasks complete
4. Deleting tasks
5. Undoing deletion of tasks (if user hasn't navigated away from page which is interpreted as confirming permanent
   deletion)
6. Hosted frontend Next.js node server on Debian VM (Google Cloud instance)
6. Backend Flask server running on Debian VM (Google Cloud instance)
7. Backend PostgreSQL database running on Debian VM (Google Cloud instance)
7. Containerized backend in Docker
8. Basic deploy script for Debian VM

## Features to implement

Due to time constraints these features weren't implemented but I would consider them items I would do before deployment
if this were to be an actual production todo app

1. Domain name with SSL certs to allow for https access and no hacky CORS rules
2. Linux services to run the node server and docker containers
3. More detailed unit/integration/regression tests for backend and frontend
4. Optimistic rendering. The design of the frontend with multiple, constant API requests per action instead of the user
   making multiple changes locally, then one API request when they click a confirm button, for example, means laggy
   frontend to backend connections are very apparent
5. More robust DevOps items. Currently the Docker and deploy scripts were made for my own convenience in prototyping,
   but should be made more generalizable for an actual production system