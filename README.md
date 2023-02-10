# Docker config

## Docker containers
The containers run on their own seperated network. The network is configured in a bridge configuration

#### Docker commands
Run `docker-compose up --build -d` to start the development server  
Run `docker-compose down` to stop the development server  
Run `docker-compose logs -f backend-dev|mariadb-dev|nginx` to show the logs of the specified container in development  
Run `docker-compose rm` to remove the containers in development. Remember to stop the containers first  
Run `docker-compose exec backend-dev|mariadb-dev|nginx /bin/bash` to ssh into the specified container in development 

Run `docker volume prune` to remove all unused container volumes. Containers must be stopped and removed for this to work.
Run `docker ps` show all running docker containers status.

# Prisma migrations
run `npm run migrations` to run migrations in the dev database

# Authentication

# Tests
run `npm run test` to run tests