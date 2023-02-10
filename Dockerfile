# Image
FROM node:18

# create destination directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# update and install dependency
RUN apt update && apt upgrade -y && apt-get install -y nano
RUN npm install -g dotenv dotenv-cli cross-env

# Configure host
ENV HOST 0.0.0.0

CMD /bin/bash -c 'npm install; npm run debug'
